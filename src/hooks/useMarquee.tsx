"use client";
import {
  MarqueeContext,
  MarqueeProvider,
  contextProps,
} from "@/providers/marquee-provider";
import { useContext } from "react";

function useMarquee(): contextProps {
  const context = useContext(MarqueeContext);
  if (context === undefined) {
    throw new Error("useMarquee must be used within a useMarqueeProvider");
  }
  return context;
}

export default useMarquee;
