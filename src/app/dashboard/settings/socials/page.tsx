"use server";

import AddSocialCard from "@/components/Cards/AddSocialCard";
import SocialsDisplay from "@/components/Cards/SocialsDisplay";
import { Button } from "@/components/ui/button";
import useTree from "@/hooks/useTree";
import React, { useEffect } from "react";
import {
  supabaseAdminConnectUser,
  supabaseGetUserSocials,
} from "@/actions/supabaseUtils";
import { auth } from "@/auth";

async function SocialsSettings() {
  const session = await auth();

  if (!session || !session.user.id) {
    console.log("no session");
    return;
  }

  const socials = await supabaseGetUserSocials(session?.user.id);
  console.log("Our returned socials data", socials);

  return (
    <div className="flex flex-col gap-8">
      <SocialsDisplay />
      <AddSocialCard />
    </div>
  );
}

export default SocialsSettings;
