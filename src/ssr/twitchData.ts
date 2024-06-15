"use server";

import { fetchTwitchFollowers } from "@/actions/twitchRequests";

export async function fetchAllTwitchData() {
  const res = await fetchTwitchFollowers();

  return res;
}
