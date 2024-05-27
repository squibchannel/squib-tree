import React from "react";
import {
  fetchTwitchFollowers,
  fetchTwitchSubs,
} from "@/actions/twitchRequests";
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

async function ProfilePage() {
  const data = await fetchTwitchFollowers();
  if (!data) return <></>;

  return (
    <Table>
      <TableCaption>Follower</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Followed At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((follower, index: number) => (
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
          <TableCell className="text-right">{data.total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ProfilePage;
