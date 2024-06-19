"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { fetchAllTwitchData, TwitchResponse } from "@/actions/twitchData";
import { fetchThirtyDaySummary } from "@/lib/axios/twitchTrackerAPI";
import {
  BroadcasterSubscription,
  GetChannelEditorsResponse,
  GetModeratorsResponse,
  GetVIPsResponse,
  TwitchFollowedChannelsResponse,
} from "@/types/api/twitchAPI";

export type ThirtyDaySummaryType = {
  avgViewers: number;
  minStreamed: number;
  hrsWatched: number;
  maxViewers: number;
};

export type TwitchDataType = {
  allData: TwitchResponse[];
  refreshAllData: () => Promise<void>;
  followers: TwitchFollowedChannelsResponse | null;
  subs: BroadcasterSubscription | null;
  vips: GetVIPsResponse | null;
  mods: GetModeratorsResponse | null;
  editors: GetChannelEditorsResponse | null;
  thirtyDay: ThirtyDaySummaryType | null; // Use the defined type here
};

export const DashboardContext = createContext<TwitchDataType>({
  allData: [],
  refreshAllData: async () => {},
  followers: null,
  subs: null,
  vips: null,
  mods: null,
  editors: null,
  thirtyDay: null,
});

export default function DashboardProvider({
  children,
}: {
  children?: ReactNode;
}) {
  const [allTwitchData, setAllTwitchData] = useState<TwitchResponse[]>([]);
  const [followers, setFollowers] =
    useState<TwitchFollowedChannelsResponse | null>(null);
  const [subs, setSubs] = useState<BroadcasterSubscription | null>(null);
  const [vips, setVips] = useState<GetVIPsResponse | null>(null);
  const [mods, setMods] = useState<GetModeratorsResponse | null>(null);
  const [editors, setEditors] = useState<GetChannelEditorsResponse | null>(
    null
  );
  const [thirtyDay, setThirtyDay] = useState<ThirtyDaySummaryType | null>(null); // Use the defined type here

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

      await fetchTwitchTrackerData();
    } catch (error) {
      console.error("Error fetching Twitch data:", error);
    }
  };

  const fetchTwitchTrackerData = async () => {
    try {
      const thirty = await fetchThirtyDaySummary();
      if (thirty) {
        const thirtyDaySummary: ThirtyDaySummaryType = {
          avgViewers: thirty.avg_viewers,
          minStreamed: thirty.minutes_streamed,
          hrsWatched: thirty.hours_watched,
          maxViewers: thirty.max_viewers,
        };
        setThirtyDay(thirtyDaySummary);
      } else {
        setThirtyDay(null); // Handle case where fetchThirtyDaySummary returns null
      }
    } catch (error) {
      console.error("Error fetching thirty day summary:", error);
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
        thirtyDay,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
