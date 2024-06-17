"use client";

import { fetchAllTwitchData, TwitchResponse } from "@/actions/twitchData";
import { fetchTwitchFollowers } from "@/actions/twitchRequests";
import { TwitchFollowedChannelsResponse } from "@/types/api/twitchAPI";
import { createContext, useEffect, useState } from "react";

export type TwitchDataType = {
  allData: any;
  refreshAllData: () => Promise<void>;
  followers: any;
  // refreshFollowers: () => Promise<void>;
  subs: any;
  vips: any;
  mods: any;
  editors: any;
};

export const DashboardContext = createContext<TwitchDataType>({
  allData: undefined, // Initial data (provider not initialized yet)
  refreshAllData: async () => {},
  followers: undefined,
  // refreshFollowers: async () => {},
  subs: undefined,
  vips: undefined,
  mods: undefined,
  editors: undefined,
});

export default function DashboardProvider({ children }: { children?: any }) {
  const [allTwitchData, setAllTwitchData] = useState<TwitchResponse[]>([]);
  const [followers, setFollowers] =
    useState<TwitchFollowedChannelsResponse | null>(null);
  const [subs, setSubs] = useState<any>(null);
  const [vips, setVips] = useState<any>(null);
  const [mods, setMods] = useState<any>(null);
  const [editors, setEditors] = useState<any>(null);

  const fetchData = async () => {
    const res = await fetchAllTwitchData();
    setAllTwitchData(res);
  };

  // const refreshFollowers = async () => {
  //   const res = await fetchTwitchFollowers();
  //   setFollowers(res?.data || null);
  // };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (allTwitchData.length === 0) {
      fetchData();
    } else {
      const followersData = allTwitchData.find(
        (data) => data.action === "followers"
      );
      setFollowers(followersData?.response || []);

      const subsData = allTwitchData.find((data) => data.action === "subs");
      setSubs(subsData);

      const vipsData = allTwitchData.find((data) => data.action === "vips");
      setVips(vipsData);

      const modsData = allTwitchData.find((data) => data.action === "mods");
      setMods(modsData);

      const editorsData = allTwitchData.find(
        (data) => data.action === "editors"
      );
      setEditors(editorsData);
    }
  }, [allTwitchData]);

  return (
    <DashboardContext.Provider
      value={{
        allData: allTwitchData, // Put the data in here
        refreshAllData: fetchData,
        followers: followers,
        // refreshFollowers: refreshFollowers,
        subs: subs,
        vips: vips,
        mods: mods,
        editors: editors,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
