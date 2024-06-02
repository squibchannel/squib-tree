import React from "react";
import { fetchTwitchFollowers } from "@/actions/twitchRequests";
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

async function FollowersTable() {
  const followers = await fetchTwitchFollowers();
  if (!followers) return <></>;

  return (
    <Table className="w-full max-w-[90vw]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Followed At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {followers.data.map((follower, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{follower.user_name}</TableCell>
            <TableCell>
              {new Date(follower.followed_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{followers.total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default FollowersTable;
