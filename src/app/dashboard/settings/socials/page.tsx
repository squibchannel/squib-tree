"use client";

import SocialsDisplay from "@/components/Cards/SocialsDisplay";
import { Button } from "@/components/ui/button";
import useTree from "@/hooks/useTree";
import React, { useEffect } from "react";

function SocialsSettings() {
  const { addSocialLink } = useTree();

  const newSocial = {
    platform: "twitter",
    description: "a place to cry",
    href: "https://x.com/Squibchannel",
  };

  const handleNewSocial = () => {
    addSocialLink(newSocial, true);
  };

  return (
    <div>
      <SocialsDisplay />
    </div>
  );
}

export default SocialsSettings;
