import { twitchAPI } from "@/lib/axios/twitchAPI";
import axios from "axios";
import { createAdminClient } from "@/lib/supabase/adminClient";
import { auth } from "@/auth";
import { TwitchFollowedChannelsResponse } from "@/types/api/twitchAPI";

export async function fetchTwitchFollowers() {
  const session = await auth();

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("userId", session?.user.id!)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Access token or user ID is missing");
  }

  try {
    const res = await twitchAPI.get<TwitchFollowedChannelsResponse>(
      `/channels/followers`,
      {
        params: {
          broadcaster_id: data.providerAccountId,
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

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("userId", session?.user.id!)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Access token or user ID is missing");
  }

  try {
    const res = await twitchAPI.get<any>(`/subscriptions`, {
      params: {
        broadcaster_id: data.providerAccountId,
        first: 100,
      },
      user_id: session?.user.id,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Failed to fetch followers:", error);
    // throw error;
  }
}
