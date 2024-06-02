import { twitchAPI } from "@/lib/axios/twitchAPI";
import axios from "axios";
import { createAdminClient } from "@/lib/supabase/adminClient";
import { auth } from "@/auth";
import {
  BroadcasterSubscription,
  TwitchFollowedChannelsResponse,
} from "@/types/api/twitchAPI";
import { supabaseAdminConnectUser } from "./supabseUtils";

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
