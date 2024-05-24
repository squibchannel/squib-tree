"use client";
import React, { ReactNode, createContext, useState } from "react";

// You can modularize the interfaces and context

// Create the typing (think of what we are returning and how it will get there)
export interface hashtagContextType {
  currentTags: string[];
  updateTags: (newTags: string[]) => void;
  hashTitle: string;
  updateTitle: (title: string) => void;
}

// Create the context and apply the typing
export const hashtagContext = createContext<hashtagContextType | undefined>(
  undefined
);

// Define what the provider is wrapped around
interface Props {
  children: ReactNode;
  defaultTags: string[];
  title: string;
}

// The provider itself is the logic we are passing dow
export const HashtagProvider = ({ children, defaultTags, title }: Props) => {
  const [currentTags, setCurrentTags] = useState<string[]>(defaultTags);
  const [hashTitle, setHashTitle] = useState<string>(title);

  const updateTags = (newTags: string[]) => {
    setCurrentTags(newTags);
  };

  const updateTitle = (title: string) => {
    setHashTitle(title);
  };

  // The end result of what's being passed down
  const value: hashtagContextType = {
    currentTags,
    updateTags,
    hashTitle,
    updateTitle,
  };

  return (
    // This syntax will be removed in React19
    <hashtagContext.Provider value={value}>{children}</hashtagContext.Provider>
  );
};
