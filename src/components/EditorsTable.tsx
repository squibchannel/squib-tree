"use client";

import React, { useContext } from "react";
import { fetchTwitchEditors } from "@/actions/twitchRequests";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Editor } from "@/types/api/twitchAPI";
import { DashboardContext } from "@/providers/DashboardProvider";

function EditorsTable() {
  const { editors } = useContext(DashboardContext);

  if (!editors) {
    return <div>Loading...</div>;
  }

  if (editors.error) {
    return <div>Error: {editors.error.message}</div>;
  }

  return (
    <Table className="w-full max-w-[90vw]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead className="w-[100px]">Starting Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {editors.response.data.map((editor: Editor, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{editor.user_name}</TableCell>
            <TableCell className="font-medium">
              {new Date(editor.created_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {editors.response.data.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default EditorsTable;
