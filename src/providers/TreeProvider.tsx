"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { SessionContextValue, useSession } from "next-auth/react";
import { SocialProps, socials } from "@/lib/const"; // Adjust path as needed

// Define types for the context
export type TreeContextType = {
  session: SessionContextValue | null;
  userSocials: SocialProps[];
  squibSocials: SocialProps[];
  addSocialLink: (newSocial: SocialProps, isSquib?: boolean) => void;
  handleSocialChange: (
    index: number,
    field: keyof SocialProps,
    value: string,
    isSquib?: boolean
  ) => void;
  removeSocialLink: (index: number, isSquib?: boolean) => void;
};

// Create context with initial values
export const TreeContext = createContext<TreeContextType>({
  session: null,
  userSocials: [],
  squibSocials: [],
  addSocialLink: (newSocial: SocialProps, isSquib?: boolean) => {},
  handleSocialChange: (
    index: number,
    field: keyof SocialProps,
    value: string,
    isSquib?: boolean
  ) => {},
  removeSocialLink: (index: number, isSquib?: boolean) => {},
});

// Define TreeProvider component
export default function TreeProvider({ children }: { children?: ReactNode }) {
  const session = useSession();
  const localStorage = window.localStorage;

  const userSocialsKey = "userSocials";
  const squibSocialsKey = "squibSocials";

  const getStoredSocials = (key: string): SocialProps[] | null => {
    const storedSocials = localStorage.getItem(key);
    return storedSocials ? JSON.parse(storedSocials) : null;
  };

  const setStoredSocials = (key: string, socials: SocialProps[]) => {
    localStorage.setItem(key, JSON.stringify(socials));
  };

  const [userSocials, setUserSocials] = useState<SocialProps[]>(() => {
    const storedUserSocials = getStoredSocials(userSocialsKey);
    return storedUserSocials !== null ? storedUserSocials : [];
  });

  const [squibSocials, setSquibSocials] = useState<SocialProps[]>(() => {
    const storedSquibSocials = getStoredSocials(squibSocialsKey);
    return storedSquibSocials !== null ? storedSquibSocials : socials;
  });

  useEffect(() => {
    const storedUserSocials = getStoredSocials(userSocialsKey);
    if (storedUserSocials) {
      setUserSocials(storedUserSocials);
    }

    const storedSquibSocials = getStoredSocials(squibSocialsKey);
    if (storedSquibSocials) {
      setSquibSocials(storedSquibSocials);
    }
  }, []);

  const addSocialLink = (newSocial: SocialProps, isSquib?: boolean) => {
    if (!isSquib) {
      const updatedUserSocials = [...userSocials, newSocial];
      setUserSocials(updatedUserSocials);
      setStoredSocials(userSocialsKey, updatedUserSocials);
    } else {
      const updatedSquibSocials = [...squibSocials, newSocial];
      setSquibSocials(updatedSquibSocials);
      setStoredSocials(squibSocialsKey, updatedSquibSocials);
    }
  };

  const handleSocialChange = (
    index: number,
    field: keyof SocialProps,
    value: string,
    isSquib?: boolean
  ) => {
    if (!isSquib) {
      const updatedUserSocials = [...userSocials];
      updatedUserSocials[index] = {
        ...updatedUserSocials[index],
        [field]: value,
      };
      setUserSocials(updatedUserSocials);
      setStoredSocials(userSocialsKey, updatedUserSocials);
    } else {
      const updatedSquibSocials = [...squibSocials];
      updatedSquibSocials[index] = {
        ...updatedSquibSocials[index],
        [field]: value,
      };
      setSquibSocials(updatedSquibSocials);
      setStoredSocials(squibSocialsKey, updatedSquibSocials);
    }
  };

  const removeSocialLink = (index: number, isSquib?: boolean) => {
    if (!isSquib) {
      const updatedUserSocials = [...userSocials];
      updatedUserSocials.splice(index, 1);
      setUserSocials(updatedUserSocials);
      setStoredSocials(userSocialsKey, updatedUserSocials);
    } else {
      const updatedSquibSocials = [...squibSocials];
      updatedSquibSocials.splice(index, 1);
      setSquibSocials(updatedSquibSocials);
      setStoredSocials(squibSocialsKey, updatedSquibSocials);
    }
  };

  // Return JSX for the component
  return (
    <TreeContext.Provider
      value={{
        session,
        userSocials,
        squibSocials,
        addSocialLink,
        handleSocialChange,
        removeSocialLink,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
}
