"use client";

import { fetchAllTwitchData, TwitchResponse } from "@/actions/twitchData";
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
import { createContext, useEffect, useState } from "react";

export type TwitchDataType = {
  allData: TwitchResponse[];
  refreshAllData: () => Promise<void>;
  followers: TwitchFollowedChannelsResponse | null;
  subs: BroadcasterSubscription | null;
  vips: GetVIPsResponse | null;
  mods: GetModeratorsResponse | null;
  editors: GetChannelEditorsResponse | null;
};

export const DashboardContext = createContext<TwitchDataType>({
  allData: [],
  refreshAllData: async () => {},
  followers: null,
  subs: null,
  vips: null,
  mods: null,
  editors: null,
});

export default function DashboardProvider({ children }: { children?: any }) {
  const [allTwitchData, setAllTwitchData] = useState<TwitchResponse[]>([]);
  const [followers, setFollowers] =
    useState<TwitchFollowedChannelsResponse | null>(null);
  const [subs, setSubs] = useState<BroadcasterSubscription | null>(null);
  const [vips, setVips] = useState<GetVIPsResponse | null>(null);
  const [mods, setMods] = useState<GetModeratorsResponse | null>(null);
  const [editors, setEditors] = useState<GetChannelEditorsResponse | null>(
    null
  );

  const fetchData = async () => {
    try {
      const res = await fetchAllTwitchData();
      setAllTwitchData(res);

      const followersData = res.find((data) => data.action === "followers");
      setFollowers(followersData?.response || null);

      const subsData = res.find((data) => data.action === "subs");
      setSubs(subsData?.response || null);

      const vipsData = res.find((data) => data.action === "vips");
      setVips(vipsData?.response || null);

      const modsData = res.find((data) => data.action === "mods");
      setMods(modsData?.response || null);

      const editorsData = res.find((data) => data.action === "editors");
      setEditors(editorsData?.response || null);
    } catch (error) {
      console.error("Error fetching Twitch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        allData: allTwitchData,
        refreshAllData: fetchData,
        followers,
        subs,
        vips,
        mods,
        editors,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
