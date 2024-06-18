"use client";

import { DashboardContext } from "@/providers/DashboardProvider";
import { useContext } from "react";
import FollowersCard from "./DashboardCards/FollowersCard";
import SubsCard from "./DashboardCards/SubsCard";

function DashboardHome() {
  const { allData } = useContext(DashboardContext);

  if (!allData) {
    return <p>Loading... </p>;
  }

  const followers = allData.find((data) => data.action === "followers");

  const subs = allData.find((data) => data.action === "subs");

  return (
    <div className="flex flex-col gap-8">
      {followers && <FollowersCard followers={followers} />}
      {subs && <SubsCard subs={subs} />}
    </div>
  );
}

export default DashboardHome;
