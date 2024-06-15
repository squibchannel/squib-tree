"use client";

import { fetchAllTwitchData } from "@/ssr/twitchData";
import { TwitchFollowedChannelsResponse } from "@/types/api/twitchAPI";
import { createContext, useEffect, useState } from "react";

export type TwitchDataType = {
  followers: TwitchFollowedChannelsResponse["data"] | undefined;
  refreshFollowers: () => Promise<void>;
};

export const DashboardContext = createContext<TwitchDataType>({
  followers: undefined, // Initial data (provider not initialized yet)
  refreshFollowers: async () => {},
});

export default function DashboardProvider({ children }: { children?: any }) {
  const [followers, setFollowers] = useState<
    TwitchFollowedChannelsResponse["data"] | undefined
  >(undefined);

  const fetchData = async () => {
    const followers = await fetchAllTwitchData();
    setFollowers(followers?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        followers: followers, // Put the data in here
        refreshFollowers: fetchData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
