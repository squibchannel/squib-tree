"use client";

import React, { useContext } from "react";
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
import { DashboardContext } from "@/providers/DashboardProvider";

function ModsTable() {
  const { mods } = useContext(DashboardContext);

  if (!mods) {
    return <div>Loading...</div>;
  }

  console.log(mods);

  return (
    <Table className="w-full max-w-[90vw]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mods.data.map((mod: Moderator, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{mod.user_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{mods.data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ModsTable;
