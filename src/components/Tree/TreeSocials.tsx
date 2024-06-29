"use client";

import { useEffect, useState } from "react";
import SocialCard from "../Cards/SocialCard";
import useTree from "@/hooks/useTree";
import { SocialProps } from "@/lib/const";

function TreeSocials() {
  const { squibSocials } = useTree();

  const localStorage = window.localStorage;

  const getStoredSocials = (key: string) => {
    const storedSocials = localStorage.getItem(key);
    return storedSocials ? JSON.parse(storedSocials) : null;
  };

  const [socials, setSocials] = useState(() => {
    const storedSocials = getStoredSocials("squibSocials");
    return storedSocials || squibSocials;
  });

  useEffect(() => {
    const storedSocials = getStoredSocials("squibSocials");

    if (storedSocials) {
      setSocials(storedSocials);
    }
  }, []);

  return (
    <>
      {socials.map((social: SocialProps, i: number) => (
        <SocialCard
          key={i}
          keyId={social.platform}
          title={social.platform.toLowerCase()}
          description={social.description}
          href={social.href}
        />
      ))}
    </>
  );
}

export default TreeSocials;
