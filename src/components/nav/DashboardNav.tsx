import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardMenu } from "@/lib/const";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";

export default function DashboardNav() {
  return (
    <header className="sticky flex w-full h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden w-full justify-between gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <ul className="flex items-center">
          <Link href={"/dashboard"} className="flex items-center">
            <span className="mr-2">
              <LuLayoutDashboard />
            </span>
          </Link>
          {dashboardMenu.map((item) => {
            return (
              <li key={`${item.name} + -dashboard-nav-item`} className="mx-2">
                <Link
                  href={item.href}
                  className="text-foreground transition-colors hover:text-foreground w-fit"
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div>
        {/* <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
    </header>
  );
}
