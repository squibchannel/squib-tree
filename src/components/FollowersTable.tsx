"use client";

import React, { useContext, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import ShoutoutButton from "./ShoutoutButton";
import { DashboardContext } from "@/providers/DashboardProvider";
import { TwitchFollowedChannelsResponse } from "@/types/api/twitchAPI";

function FollowersTable() {
  const { followers } = useContext(DashboardContext);

  if (!followers) {
    return <div>Loading...</div>;
  }

  if (followers.error) {
    return <div>Error: {followers.error.message}</div>;
  }

  return (
    <>
      {/* <Button onClick={refreshFollowers}>Refresh Followers</Button> */}
      <Table className="w-full max-w-[90vw]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Followed At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(followers.data || []).map(
            (
              follower: TwitchFollowedChannelsResponse["data"][0],
              index: number
            ) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {follower.user_name}
                </TableCell>
                <TableCell>
                  {new Date(follower.followed_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {followers?.total || 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default FollowersTable;
