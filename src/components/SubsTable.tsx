import React from "react";
import { fetchTwitchSubs } from "@/actions/twitchRequests";
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

async function SubsTable() {
  const res = await fetchTwitchSubs();
  if (!res) return <></>;

  const subs = res.data.data;

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
        {subs.map((sub, index: number) => (
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
          <TableCell className="text-right">{subs.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default SubsTable;
