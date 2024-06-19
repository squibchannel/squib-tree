import {
  GetModeratorsResponse,
  Moderator,
  TwitchFollowedChannelsResponse,
} from "@/types/api/twitchAPI";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ModsCardProps {
  mods?: {
    response?: {
      data: GetModeratorsResponse["data"][0][]; // Array of first-level data
      total?: number;
    };
  };
}

function ModsCard({ mods }: ModsCardProps) {
  if (!mods || !mods.response || !mods.response.data) {
    return <p>Loading... </p>;
  }

  const recentMods = mods.response.data.slice(0, 3);

  return (
    <Card className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-purple-800 px-4 py-2">
        <CardTitle className="text-lg font-semibold text-purple-100">
          Mods
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="mb-4 text-purple-200">Recent:</p>
        <ul className="flex flex-wrap gap-2">
          {recentMods.map((mod: Moderator) => (
            <li
              key={mod.user_id}
              className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100"
            >
              <Link
                href={`https://www.twitch.tv/${mod.user_name}`}
                target="_blank"
              >
                {mod.user_name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-purple-200">
          Total:{" "}
          <span className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100 bg-opacity-25">
            {mods.response.data.length || 0}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default ModsCard;
