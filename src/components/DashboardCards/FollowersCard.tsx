import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { TwitchFollowedChannelsResponse } from "@/types/api/twitchAPI";
import Link from "next/link";

interface FollowersCardProps {
  followers?: {
    response?: {
      data: TwitchFollowedChannelsResponse["data"][0][]; // Array of first-level data
      total?: number;
    };
  };
}

function FollowersCard({ followers }: FollowersCardProps) {
  if (!followers || !followers.response || !followers.response.data) {
    return <p>Loading... </p>;
  }

  const recentFollowers = followers.response.data.slice(0, 3);

  return (
    <Card className="bg-gray-900 shadow-lg rounded-lg overflow-hidden w-fit">
      <CardHeader className="bg-purple-800 px-4 py-2">
        <CardTitle className="text-lg font-semibold text-purple-100">
          Followers
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="mb-4 text-purple-200">Recent:</p>
        <ul className="flex flex-wrap gap-2">
          {recentFollowers.map(
            (follower: TwitchFollowedChannelsResponse["data"][0]) => (
              <li
                key={follower.user_id}
                className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100"
              >
                <Link
                  href={`https://www.twitch.tv/${follower.user_name}`}
                  target="_blank"
                >
                  {follower.user_name}
                </Link>
              </li>
            )
          )}
        </ul>
        <p className="mt-4 text-purple-200">
          Total: {followers.response.total || 0}
        </p>
      </CardContent>
    </Card>
  );
}

export default FollowersCard;
