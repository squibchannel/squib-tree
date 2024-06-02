import React from "react";
import { fetchTwitchMods } from "@/actions/twitchRequests";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Moderator } from "@/types/api/twitchAPI";

async function ModsTable() {
  const res = await fetchTwitchMods();
  if (!res) {
    console.log("mod data not found");
  }
  const mods = res?.data.data;

  return (
    <Table className="w-full max-w-[90vw]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mods.map((mod: Moderator, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{mod.user_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{mods.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ModsTable;
