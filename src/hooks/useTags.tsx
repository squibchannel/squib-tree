"use client";
import {
  hashtagContext,
  hashtagContextType,
} from "@/providers/hashtag-provider";
import { useContext } from "react";

function useTags(): hashtagContextType {
  const context = useContext(hashtagContext);
  if (context === undefined) {
    throw new Error("useTag must be used within a hashtagProvider");
  }
  return context;
}

export default useTags;
