import DashboardNav from "@/components/nav/DashboardNav";
import React, { ReactNode, createContext } from "react";

interface Props {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  return (
    <div>
      <DashboardNav />
      {children}
    </div>
  );
}
