import DashboardNav from "@/components/nav/DashboardNav";
import DashboardProvider from "@/providers/DashboardProvider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <DashboardProvider>
      <div>
        <DashboardNav />
        {children}
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
