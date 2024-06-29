"use client";

// Import necessary dependencies
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
  addSocialLink: (newSocial: SocialProps, isSquib?: boolean) => {},
  handleSocialChange: (
    index: number,
    field: keyof SocialProps,
    value: string,
    isSquib?: boolean
  ) => {},
  removeSocialLink: (index: number, isSquib?: boolean) => {},
  squibSocials: [],
});

// Define TreeProvider component
export default function TreeProvider({ children }: { children?: ReactNode }) {
  const session = useSession();

  const [userSocials, setUserSocials] = useState<SocialProps[]>([]);
  const [squibSocials, setSquibSocials] = useState<SocialProps[]>(socials);

  const localStorage = window.localStorage;

  const getStoredSocials = (key: string) => {
    const storedSocials = localStorage.getItem(key);
    return storedSocials ? JSON.parse(storedSocials) : false;
  };

  const setStoredSocials = (key: string, socials: SocialProps[]) => {
    localStorage.setItem(key, JSON.stringify(socials));
  };

  const userSocialsKey = "userSocials";
  const squibSocialsKey = "squibSocials";

  let storedUserSocials = getStoredSocials(userSocialsKey);
  let storedSquibSocials = getStoredSocials(squibSocialsKey);

  useEffect(() => {
    if (storedUserSocials) {
      setUserSocials(storedUserSocials);
    }

    if (storedSquibSocials) {
      setSquibSocials(storedSquibSocials);
    }
  }, []);

  const addSocialLink = (newSocial: SocialProps, isSquib?: boolean) => {
    // let storedUserSocials = getStoredSocials(userSocialsKey);
    // let storedSquibSocials = getStoredSocials(squibSocialsKey);

    if (!isSquib) {
      if (storedUserSocials) {
        setUserSocials(storedUserSocials);
      }

      const updatedUserSocials = [...storedUserSocials, newSocial];
      setUserSocials(updatedUserSocials);
      setStoredSocials(userSocialsKey, updatedUserSocials);
    } else {
      if (!storedSquibSocials) {
        const updatedSquibSocials = [...squibSocials, newSocial];
        setSquibSocials(updatedSquibSocials);
        setStoredSocials(squibSocialsKey, updatedSquibSocials);
      } else {
        setSquibSocials(storedSquibSocials);
        const updatedSquibSocials = [...storedSquibSocials, newSocial];
        setSquibSocials(updatedSquibSocials);
        setStoredSocials(squibSocialsKey, updatedSquibSocials);
      }
    }
  };

  const handleSocialChange = (
    index: number,
    field: keyof SocialProps,
    value: string,
    isSquib?: boolean
  ) => {
    if (!isSquib) {
      const storedUserSocials = getStoredSocials(userSocialsKey);
      const updatedUserSocials = [...storedUserSocials];
      updatedUserSocials[index][field] = value;
      setUserSocials(updatedUserSocials);
      setStoredSocials(userSocialsKey, updatedUserSocials);
    } else {
      const storedSquibSocials = getStoredSocials(squibSocialsKey);
      const updatedSquibSocials = [...storedSquibSocials];
      updatedSquibSocials[index][field] = value;
      setSquibSocials(updatedSquibSocials);
      setStoredSocials(squibSocialsKey, updatedSquibSocials);
    }
  };

  const removeSocialLink = (index: number, isSquib?: boolean) => {
    if (!isSquib) {
      const storedUserSocials = getStoredSocials(userSocialsKey);
      const updatedUserSocials = [...storedUserSocials];
      updatedUserSocials.splice(index, 1);
      setUserSocials(updatedUserSocials);
      setStoredSocials(userSocialsKey, updatedUserSocials);
    } else {
      const storedSquibSocials = getStoredSocials(squibSocialsKey);
      const updatedSquibSocials = [...storedSquibSocials];
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
        addSocialLink,
        handleSocialChange,
        removeSocialLink,
        squibSocials,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
}
