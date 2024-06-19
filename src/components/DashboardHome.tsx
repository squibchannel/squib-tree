"use client";
import { DashboardContext } from "@/providers/DashboardProvider";
import { useContext, useState, useEffect } from "react";
import FollowersCard from "./DashboardCards/FollowersCard";
import SubsCard from "./DashboardCards/SubsCard";
import VipsCard from "./DashboardCards/VipsCard";
import ModsCard from "./DashboardCards/ModsCard";
import EditorsCard from "./DashboardCards/EditorsCard";
import { Card } from "./ui/card";
import ThirtyDayCard from "./DashboardCards/ThirtyDayCard";
import Loading from "./Loading";

function DashboardHome() {
  const { allData, thirtyDay } = useContext(DashboardContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (allData && thirtyDay) {
      setIsLoading(false);
    }
  }, [allData, thirtyDay]);

  // Use a loading state until both allData and thirtyDay are available
  if (isLoading) {
    return <Loading isOpen={true} />;
  }

  // Once data is loaded, render the dashboard content
  const followers = allData.find((data) => data.action === "followers");
  const subs = allData.find((data) => data.action === "subs");
  const vips = allData.find((data) => data.action === "vips");
  const mods = allData.find((data) => data.action === "mods");
  const editors = allData.find((data) => data.action === "editors");

  return (
    <Card className="w-fit p-4 border-transparent mx-auto">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ThirtyDayCard data={thirtyDay} />
        {followers && <FollowersCard followers={followers} />}
        {subs && <SubsCard subs={subs} />}
        {vips && <VipsCard vips={vips} />}
        {mods && <ModsCard mods={mods} />}
        {editors && <EditorsCard editors={editors} />}
      </div>
    </Card>
  );
}

export default DashboardHome;
