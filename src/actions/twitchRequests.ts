import { twitchAPI } from "@/lib/axios/twitchAPI";
import { auth } from "@/auth";
import {
  BroadcasterSubscription,
  GetModeratorsRequestParams,
  GetModeratorsResponse,
  TwitchFollowedChannelsResponse,
} from "@/types/api/twitchAPI";
import { supabaseAdminConnectUser } from "./supabaseUtils";

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
