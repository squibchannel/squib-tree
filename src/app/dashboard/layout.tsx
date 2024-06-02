import DashboardNav from "@/components/nav/DashboardNav";

import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div>
      <DashboardNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
