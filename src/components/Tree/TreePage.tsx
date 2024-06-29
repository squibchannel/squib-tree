"use server";

import React from "react";
import SquibTitleCard from "../Cards/SquibTitleCard";
import SocialCard from "../Cards/SocialCard";
import { socials } from "@/lib/const";
import { auth } from "@/auth";
import TreeSocials from "./TreeSocials";

async function TreePage() {
  // const session = await auth();
  // console.log(session);

  return (
    <>
      <SquibTitleCard />
      <div className="flex flex-col gap-5">
        <TreeSocials />
      </div>
    </>
  );
}

export default TreePage;
