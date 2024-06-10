"use server";

import { twitchAPI } from "@/lib/axios/twitchAPI";
import { auth } from "@/auth";
import {
  BroadcasterSubscription,
  GetChattersResponse,
  GetClipsQueryParameters,
  GetClipsResponse,
  GetModeratorsRequestParams,
  GetModeratorsResponse,
  SendMessageResponse,
  TwitchFollowedChannelsResponse,
} from "@/types/api/twitchAPI";
import { supabaseAdminConnectUser } from "./supabaseUtils";
import { Pagination } from "@/types/api/twitchAPI";

export async function fetchTwitchFollowers() {
  const session = await auth();

  const supabaseAdmin = await supabaseAdminConnectUser(session);

  try {
    const res = await twitchAPI.get<TwitchFollowedChannelsResponse>(
      `/channels/followers`,
      {
        params: {
          broadcaster_id: supabaseAdmin.providerAccountId,
          first: 100,
        },
        user_id: session?.user.id,
      }
    );
    return res.data;
  } catch (error) {
    console.log("Failed to fetch followers:", error);
    // throw error;
  }
}

export async function fetchTwitchSubs() {
  const session = await auth();

  const supabaseAdmin = await supabaseAdminConnectUser(session);

  try {
    const res = await twitchAPI.get<BroadcasterSubscription>(`/subscriptions`, {
      params: {
        broadcaster_id: supabaseAdmin.providerAccountId,
        first: 100,
      },
      user_id: session?.user.id,
    });

    return res;
  } catch (error) {
    console.log("Failed to fetch followers:", error);
    // throw error;
  }
}

export async function fetchTwitchMods() {
  const session = await auth();

  const supabaseAdmin = await supabaseAdminConnectUser(session);

  if (!supabaseAdmin || !supabaseAdmin.providerAccountId) {
    throw new Error("No providerAccountId found for the user");
  }

  try {
    const res = await twitchAPI.get(`/moderation/moderators`, {
      params: {
        broadcaster_id: supabaseAdmin.providerAccountId,
      },
      user_id: session?.user.id,
    });

    return res;
  } catch (error) {
    // console.log(supabaseAdmin);
    console.log("Failed to fetch Mods", error);
    // throw error;
  }
}

export async function fetchTwitchVips() {
  const session = await auth();

  const supabaseAdmin = await supabaseAdminConnectUser(session);

  if (!supabaseAdmin || !supabaseAdmin.providerAccountId) {
    throw new Error("No providerAccountId found for the user");
  }

  try {
    const res = await twitchAPI.get(`/channels/vips`, {
      params: {
        broadcaster_id: supabaseAdmin.providerAccountId,
      },
      user_id: session?.user.id,
    });

    return res;
  } catch (error) {
    // console.log(supabaseAdmin);
    console.log("Failed to fetch Vips", error);
    // throw error;
  }
}

export async function fetchTwitchEditors() {
  const session = await auth();

  const supabaseAdmin = await supabaseAdminConnectUser(session);

  if (!supabaseAdmin || !supabaseAdmin.providerAccountId) {
    throw new Error("No providerAccountId found for the user");
  }

  try {
    const res = await twitchAPI.get(`/channels/editors`, {
      params: {
        broadcaster_id: supabaseAdmin.providerAccountId,
      },
      user_id: session?.user.id,
    });

    return res;
  } catch (error) {
    // console.log(supabaseAdmin);
    console.log("Failed to fetch editors", error);
    // throw error;
  }
}

export async function sendChatMessage(
  message: string
): Promise<SendMessageResponse> {
  const session = await auth();

  const supabaseAdmin = await supabaseAdminConnectUser(session);

  if (!supabaseAdmin || !supabaseAdmin.providerAccountId) {
    throw new Error("No providerAccountId found for the user");
  }
  // thanks
  const broadcaster_id = supabaseAdmin.providerAccountId;

  try {
    const res = await twitchAPI.post<SendMessageResponse>(
      `/chat/messages`,
      {
        broadcaster_id: broadcaster_id,
        sender_id: broadcaster_id,
        message: message,
      },
      {
        // we are using interceptors so we don't need headers here, but typical layout goes like this
        // headers: {},
        user_id: session?.user.id,
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to send chat message: ${error}`);
  }
}

export async function getChatters(): Promise<GetChattersResponse> {
  const session = await auth();
  const supabaseAdmin = await supabaseAdminConnectUser(session);

  if (!supabaseAdmin || !supabaseAdmin.providerAccountId) {
    throw new Error("No providerAccountId found for the user");
  }

  const broadcaster_id = supabaseAdmin.providerAccountId;

  try {
    const res = await twitchAPI.get<GetChattersResponse>("/chat/chatters", {
      params: {
        broadcaster_id: broadcaster_id,
        moderator_id: broadcaster_id,
      },
      user_id: session?.user.id,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to get chatters: ${error}`);
  }
}

export async function getClips({
  after,
  before,
}: {
  after?: string | null;
  before?: string | null;
} = {}): Promise<GetClipsResponse> {
  const session = await auth();
  const supabaseAdmin = await supabaseAdminConnectUser(session);

  if (!supabaseAdmin || !supabaseAdmin.providerAccountId) {
    throw new Error("No providerAccountId found for the user");
  }

  const broadcaster_id = supabaseAdmin.providerAccountId;

  try {
    const params: GetClipsQueryParameters = {
      broadcaster_id: broadcaster_id,
      first: 9,
    };

    if (after) {
      params.after = after;
      console.log("Using After Cursor", [params.after, params.before]);
    } else if (before) {
      params.before = before;
      console.log("Using Before Cursor", [params.after, params.before]);
    }

    console.log("Request Params:", params);

    // ==========
    // twitchAPI.interceptors.request.use(
    //   (config) => {
    //     console.log("Request:", config);
    //     return config;
    //   },
    //   (error) => {
    //     console.error("Request error:", error);
    //     return Promise.reject(error);
    //   }
    // );

    // =================

    // twitchAPI.interceptors.response.use(
    //   (response) => {
    //     console.log("Response:", response);
    //     return response;
    //   },
    //   (error) => {
    //     console.error("Response error:", error);
    //     return Promise.reject(error);
    //   }
    // );
    // ================

    const res = await twitchAPI.get<GetClipsResponse>("/clips", {
      params: params,
      user_id: session?.user.id,
    });

    return res.data;
  } catch (error) {
    throw new Error(`Failed to get clips: ${error}`);
  }
}