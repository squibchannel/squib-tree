"use client";
import React, { ReactNode, createContext, useState } from "react";

// You can modularize the interfaces and context

interface UpdateTagsType {
  newTags: string[];
  newTitle: string;
}

// Create the typing (think of what we are returning and how it will get there)
export interface hashtagContextType {
  currentTags: string[];
  updateTags: ({ newTags, newTitle }: UpdateTagsType) => void;
  hashTitle: string;
}

// Create the context and apply the typing
export const hashtagContext = createContext<hashtagContextType | undefined>(
  undefined
);

// Define what the provider is wrapped around
interface Props {
  children: ReactNode;
  defaultTags: string[];
}

// The provider itself is the logic we are passing dow
export const HashtagProvider = ({ children, defaultTags }: Props) => {
  const [currentTags, setCurrentTags] = useState<string[]>(defaultTags);
  const [hashTitle, setHashTitle] = useState<string>("Trending Top 100 Hashes");

  const updateTags = ({ newTags, newTitle }: UpdateTagsType) => {
    setCurrentTags(newTags);
    setHashTitle(newTitle);
  };

  // The end result of what's being passed down
  const value: hashtagContextType = {
    currentTags,
    updateTags,
    hashTitle,
  };

  return (
    // This syntax will be removed in React19
    <hashtagContext.Provider value={value}>{children}</hashtagContext.Provider>
  );
};
