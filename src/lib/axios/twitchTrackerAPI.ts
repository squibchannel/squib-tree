"use server";

import { auth } from "@/auth";
import axios from "axios";
// import { ThirtyDaySummaryType } from "@/providers/DashboardProvider";

export const fetchThirtyDaySummary = async () => {
  try {
    const session = await auth(); // Assuming auth() returns authentication details

    const url = `https://twitchtracker.com/api/channels/summary/${session?.user.name}`;

    const response = await axios.get(url);

    console.log("Status", response.status);

    if (response.status === 200) {
      return response.data; // Assuming response.data matches ThirtyDaySummaryType
    } else {
      console.error("Failed to fetch channel summary:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching channel summary:", error);
    return null;
  }
};
