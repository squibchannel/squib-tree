"use client";

import React, { useContext } from "react";
import { fetchTwitchSubs } from "@/actions/twitchRequests";
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

function SubsTable() {
  const { subs } = useContext(DashboardContext);

  if (!subs) {
    return <div>Loading...</div>;
  }

  if (subs.error) {
    return <div>Error: {subs.error.message}</div>;
  }

  return (
    <Table className="w-full max-w-[90vw]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>Gifted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subs.response.data.map((sub: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{sub.user_name}</TableCell>
            <TableCell>{sub.tier.split("0")}</TableCell>
            <TableCell>{sub.is_gift ? sub.gifter_login : "false"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{subs.response.total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default SubsTable;
