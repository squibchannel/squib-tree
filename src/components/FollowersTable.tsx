"use client";

import React, { useContext } from "react";

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

function FollowersTable() {
  const { followers, refreshFollowers } = useContext(DashboardContext);

  return (
    <>
      <Button onClick={refreshFollowers}>Refresh</Button>
      <Table className="w-full max-w-[90vw]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Followed At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(followers || []).map((follower, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {follower.user_name}
              </TableCell>
              <TableCell>
                {new Date(follower.followed_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <ShoutoutButton follower={follower} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {followers?.length || 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default FollowersTable;
