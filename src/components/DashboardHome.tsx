"use client";

import { DashboardContext } from "@/providers/DashboardProvider";
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function DashboardHome() {
  const { allData } = useContext(DashboardContext);
  console.log(allData);
  return (
    <div className="flex flex-col gap-8">
      {allData.map((data) => {
        return (
          <Card>
            <CardHeader>
              <CardTitle>{data.action}</CardTitle>
            </CardHeader>
            <CardContent>
              {data.response.data.map((key) => (
                <p>{key.user_name}</p>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DashboardHome;
