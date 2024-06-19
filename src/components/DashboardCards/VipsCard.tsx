import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  GetVIPsResponse,
  TwitchFollowedChannelsResponse,
  VIP,
} from "@/types/api/twitchAPI";
import Link from "next/link";

interface VipsCardProps {
  vips?: {
    response?: {
      data: GetVIPsResponse["data"][0][]; // Array of first-level data
      total?: number;
    };
  };
}

function VipsCard({ vips }: VipsCardProps) {
  if (!vips || !vips.response || !vips.response.data) {
    return <p>Loading... </p>;
  }

  const recentVips = vips.response.data.slice(0, 3);

  return (
    <Card className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-purple-800 px-4 py-2">
        <CardTitle className="text-lg font-semibold text-purple-100">
          Vips
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="mb-4 text-purple-200">Recent:</p>
        <ul className="flex flex-wrap gap-2">
          {recentVips.map((vip: VIP) => (
            <li
              key={vip.user_id}
              className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100"
            >
              <Link
                href={`https://www.twitch.tv/${vip.user_name}`}
                target="_blank"
              >
                {vip.user_name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-purple-200">
          Total:{" "}
          <span className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100 bg-opacity-25">
            {vips.response.data.length || 0}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default VipsCard;
