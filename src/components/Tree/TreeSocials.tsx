"use client";

import { useEffect, useState } from "react";
import SocialCard from "../Cards/SocialCard";

import useTree from "@/hooks/useTree";

function TreeSocials() {
  const { squibSocials } = useTree();

  const [socials, setSocials] = useState(squibSocials);

  const localStorage = window.localStorage;

  const getStoredSocials = (key: string) => {
    const storedSocials = localStorage.getItem(key);
    return storedSocials ? JSON.parse(storedSocials) : false;
  };

  useEffect(() => {
    const storedSocials = getStoredSocials("squibSocials");

    if (!storedSocials) {
      console.log("No stored socials");
      return;
    }

    setSocials(storedSocials);
  }, [socials]);

  return socials.map((social, i) => (
    <SocialCard
      key={i}
      keyId={social.platform}
      title={social.platform.toLowerCase()}
      description={social.description}
      href={social.href}
    />
  ));
}

export default TreeSocials;
