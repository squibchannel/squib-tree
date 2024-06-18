"use server";

import {
  fetchTwitchEditors,
  fetchTwitchFollowers,
  fetchTwitchMods,
  fetchTwitchSubs,
  fetchTwitchVips,
} from "@/actions/twitchRequests";
import { twitchAPI } from "@/lib/axios/twitchAPI";
import {
  BroadcasterSubscription,
  Editor,
  GetChannelEditorsResponse,
  GetModeratorsResponse,
  GetVIPsResponse,
  Moderator,
  TwitchFollowedChannelsResponse,
  VIP,
} from "@/types/api/twitchAPI";
import { AxiosError, AxiosResponse } from "axios";

// Define Twitch actions to fetch data
const twitchActions = [
  { action: "followers", fetchFunction: fetchTwitchFollowers },
  { action: "subs", fetchFunction: fetchTwitchSubs },
  { action: "vips", fetchFunction: fetchTwitchVips },
  { action: "mods", fetchFunction: fetchTwitchMods },
  { action: "editors", fetchFunction: fetchTwitchEditors },
];

// Interface to structure response objects
export interface TwitchResponse {
  action: string | undefined;
  response?: any;
  error?: any;
}

// Function to fetch all Twitch data
export async function fetchAllTwitchData(): Promise<TwitchResponse[]> {
  const responses: TwitchResponse[] = [];

  twitchAPI.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      console.error("Error in Twitch API request:", error.message);

      const action = error.config?.url?.split("/").pop();

      if (action) {
        const existingRes = responses.find((res) => res.action === action);
        if (existingRes) {
          existingRes.error = error.response?.data;
        } else {
          responses.push({
            action,
            response: undefined,
            error: error.response?.data,
          });
        }
      }

      return Promise.reject(error);
    }
  );

  await Promise.all(
    twitchActions.map(async (actionObj) => {
      const existingRes = responses.find(
        (res) => res.action === actionObj.action
      );
      if (!existingRes) {
        responses.push({
          action: actionObj.action,
          response: undefined,
          error: null,
        });
      }
      try {
        const response = await actionObj.fetchFunction();
        const existingRes = responses.find(
          (res) => res.action === actionObj.action
        );
        if (existingRes) {
          existingRes.response = response?.data;
        }
      } catch (error: any) {
        const axiosError = error as AxiosError;
        const existingRes = responses.find(
          (res) => res.action === actionObj.action
        );
        if (existingRes) {
          existingRes.error = axiosError.response?.data;
        }
      }
    })
  );

  return responses;
}
