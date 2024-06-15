import { env } from "@/lib/env";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { supabaseAdmin } from "../supabase/adminClient";

// Define an interface that extends InternalAxiosRequestConfig
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  user_id?: string;
}

export const twitchAPI: AxiosInstance = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-Id": env.AUTH_TWITCH_ID,
  },
});

// Extracted request interceptor logic
async function addRequestInterceptor(
  config: CustomAxiosRequestConfig
): Promise<CustomAxiosRequestConfig> {
  const user_id = config.user_id;

  if (!user_id) throw new Error("No user id found");

  const { data, error } = await supabaseAdmin
    .from("accounts")
    .select("access_token")
    .eq("userId", user_id)
    .single();

  if (!data || error) {
    throw new Error("Failed to get the access token from the database");
  }

  config.headers["Authorization"] = "Bearer " + data.access_token;

  return config;
}

// Extracted response interceptor logic
async function handleResponseError(error: any): Promise<any> {
  const originalRequest: CustomAxiosRequestConfig = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const user_id = originalRequest.user_id;

    if (!user_id) {
      console.log("can not find the user ID to refresh the token");
      return Promise.reject("can not find the user ID to refresh the token");
    }

    const { data, error: DBerror } = await supabaseAdmin
      .from("accounts")
      .select("refresh_token")
      .eq("userId", user_id)
      .single();

    if (DBerror || !data.refresh_token) {
      return Promise.reject("failed to get the refresh Token");
    }

    const newToken = await RefreshToken(data.refresh_token, user_id);

    if (!newToken) {
      console.log("Error refreshing token");
      return Promise.reject("failed to get the new Token");
    }

    originalRequest.headers["Authorization"] = "Bearer " + newToken;

    return twitchAPI(originalRequest);
  }

  return Promise.reject(error);
}

// Reusable function to add interceptors
export function addTwitchTokenAndRefresh(instance: AxiosInstance) {
  instance.interceptors.request.use((config) =>
    addRequestInterceptor(config as CustomAxiosRequestConfig)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => handleResponseError(error)
  );
}

async function RefreshToken(
  refreshToken: string,
  user_id: string
): Promise<string | null> {
  console.log("refreshing token");
  try {
    const res = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${env.AUTH_TWITCH_ID}&client_secret=${env.AUTH_TWITCH_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`
    );

    const { error } = await supabaseAdmin
      .from("accounts")
      .update({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      })
      .eq("userId", user_id);

    if (error) {
      console.log("error updating tokens");
      return null;
    }

    return res.data.access_token;
  } catch (error) {
    console.error("error refreshing token");
    console.log(error);
    return null;
  }
}

// Apply the interceptors to the default twitchAPI instance
addTwitchTokenAndRefresh(twitchAPI);
