import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { TwitchFollowedChannelsResponse } from "@/types/api/twitchAPI";
import Link from "next/link";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

interface subsCardProps {
  subs?: {
    response?: {
      data: TwitchFollowedChannelsResponse["data"][0][]; // Array of first-level data
      total?: number;
    };
  };
}

function SubsCard({ subs }: subsCardProps) {
  const session = useSession();
  let user = session?.data?.user.name;

  if (!subs || !subs.response || !subs.response.data) {
    return <p>Loading... </p>;
  }

  const shuffledSubs = shuffleArray([...subs.response.data], user!);
  const randomSubs = shuffledSubs.slice(0, 3);

  return (
    <Card className="bg-gray-900 shadow-lg rounded-lg overflow-hidden w-fit">
      <CardHeader className="bg-purple-800 px-4 py-2">
        <CardTitle className="text-lg font-semibold text-purple-100">
          Subscribers
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="mb-4 text-purple-200">Random Few:</p>
        <ul className="flex flex-wrap gap-2">
          {randomSubs.map((sub: TwitchFollowedChannelsResponse["data"][0]) => (
            <li
              key={sub.user_id}
              className="bg-purple-700 rounded-full px-3 py-1 text-sm text-purple-100"
            >
              <Link
                href={`https://www.twitch.tv/${sub.user_name}`}
                target="_blank"
              >
                {sub.user_name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-purple-200">
          Total: {subs.response.total || 0}
        </p>
      </CardContent>
    </Card>
  );
}

// Function to shuffle an array (Fisher-Yates algorithm) and exclude current user
const shuffleArray = (array: any[], currentUser: string | undefined) => {
  const filteredArray = array.filter((item) => item.user_name !== currentUser);
  for (let i = filteredArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredArray[i], filteredArray[j]] = [filteredArray[j], filteredArray[i]];
  }
  return filteredArray;
};

export default SubsCard;
