import { getChatters } from "@/actions/twitchRequests";
import { toast } from "sonner";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Chatter } from "@/types/api/twitchAPI";

async function TwitchChatters() {
  const res = await getChatters();
  if (!res) {
    toast.error("Failed to get chatters");
    return;
  }
  const chatters = res.data;
  return (
    <Table className="w-full max-w-fit mt-10 mx-auto mb-5 items-center">
      <TableHeader>
        <TableRow>
          <TableHead colSpan={5} className="text-center font-bold text-xl">
            Users In Chat!
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chatters.map((chatter: Chatter, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{chatter.user_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{chatters.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default TwitchChatters;
