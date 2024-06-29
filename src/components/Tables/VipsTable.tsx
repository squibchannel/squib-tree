"use client";

import React, { useContext } from "react";
import { fetchTwitchVips } from "@/actions/twitchRequests";
import { VIP } from "@/types/api/twitchAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardContext } from "@/providers/DashboardProvider";

function VipsTable() {
  const { vips } = useContext(DashboardContext);

  if (!vips) {
    return <div>Loading...</div>;
  }

  return (
    <Table className="w-full max-w-[90vw]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vips.data.map((vip: VIP, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{vip.user_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{vips.data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default VipsTable;
