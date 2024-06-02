import React from "react";
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

async function VipsTable() {
  const res = await fetchTwitchVips();
  if (!res) <></>;

  const vips = res?.data.data;

  return (
    <Table className="w-full max-w-[90vw]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vips.map((vip: VIP, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{vip.user_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{vips.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default VipsTable;
