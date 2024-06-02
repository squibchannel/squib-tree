import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { auth } from "@/auth";

async function ProfileCard() {
  const session = await auth();
  // console.log(session);

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="flex items-center">
            {session?.user.image && (
              <img
                src={session.user.image}
                alt={`${session?.user.name}'s profile`}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            {session?.user.name}
          </CardTitle>
          <CardDescription>
            Check me out on{" "}
            <a
              href={`https://twitch.tv/${session?.user.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              twitch!
            </a>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default ProfileCard;
