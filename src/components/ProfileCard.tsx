import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

async function ProfileCard() {
  const session = await auth();

  return (
    <Card className="w-[50vw] mx-auto bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-center text-center bg-purple-800 px-4 py-2">
        <div className="grid gap-2">
          <CardTitle className="flex items-center text-lg font-semibold text-purple-100">
            {session?.user.name}
            <img
              src={session?.user.image || ""}
              alt={`${session?.user.name}'s profile`}
              className="w-12 h-12 rounded-full mr-2 ml-2"
            />
          </CardTitle>
          <CardDescription className="mt-4">
            <a
              href={`https://twitch.tv/${session?.user.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-primary font-extrabold">twitch.tv</span>
            </a>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default ProfileCard;
