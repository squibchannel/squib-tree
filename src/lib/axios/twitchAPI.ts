import { env } from "@/lib/env";
import axios from "axios";
import { supabaseAdmin } from "../supabase/adminClient";

export const twitchAPI = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-Id": env.AUTH_TWITCH_ID,
  },
});

// before the req
twitchAPI.interceptors.request.use(async (config) => {
  const user_id = config.user_id;

  if (!user_id) throw new Error("No user id found");

  const { data, error } = await supabaseAdmin
    .from("accounts")
    .select("access_token")
    .eq("userId", user_id)
    .single();

  if (!data || error)
    throw new Error("Failed to get the access token from the database");

  config.headers["Authorization"] = "Bearer " + data.access_token;

  return config;
});

// after the req
twitchAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  //handle response error
  async function (error) {
    //originalRequest
    const originalRequest = error.config;
    // console.log(error);

    //if the error status = 401 we update the token and retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      //get the channel from the request
      const user_id = error.response?.config.user_id;

      const { data, error: DBerror } = await supabaseAdmin
        .from("accounts")
        .select("refresh_token")
        .eq("userId", user_id)
        .single();

      if (DBerror || !data.refresh_token) {
        return Promise.reject("failed to get the refresh Token");
      }

      //fetch the new accessToken and update the tokens
      const newToken = await RefreshToken(data.refresh_token, user_id);

      if (!newToken) {
        console.log("Error refreshing token");
        return Promise.reject("failed to get the new Token");
      }

      //update the headers for the new request
      originalRequest.headers["Authorization"] = "Bearer " + newToken;

      //make the new request
      const res = twitchAPI(originalRequest);

      return res;
    }
    return Promise.reject(error);
  }
);

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
