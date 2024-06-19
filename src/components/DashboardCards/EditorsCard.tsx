import {
  Editor,
  GetChannelEditorsResponse,
  GetModeratorsResponse,
  Moderator,
  TwitchFollowedChannelsResponse,
} from "@/types/api/twitchAPI";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface editorsCardProps {
  editors?: {
    response?: {
      data: GetChannelEditorsResponse["data"][0][]; // Array of first-level data
      total?: number;
    };
  };
}

function EditorsCard({ editors }: editorsCardProps) {
  if (!editors || !editors.response || !editors.response.data) {
    return <p>Loading... </p>;
  }

  const recenteditors = editors.response.data.slice(0, 3);

  return (
    <Card className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-purple-800 px-4 py-2">
        <CardTitle className="text-lg font-semibold text-purple-100">
          editors
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="mb-4 text-purple-200">Recent:</p>
        <ul className="flex flex-wrap gap-2">
          {recenteditors.map((mod: Editor) => (
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
            {editors.response.data.length || 0}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default EditorsCard;
