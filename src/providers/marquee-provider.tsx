"use client";
import React, {
  ReactNode,
  createContext,
  startTransition,
  useOptimistic,
  useState,
} from "react";

// Define the type for the context
export interface contextProps {
  speed: number;
  changeSpeed: (customValue: number) => void;
}

// Create the context with TypeScript type
export const MarqueeContext = createContext<contextProps | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

// create a provider to change and update the speed of the Marquee
export const MarqueeProvider = ({ children }: Props) => {
  const [speed, setSpeed] = useState(200);

  // function to increase speed by 10 sec by default or custom number
  const changeSpeed = (customValue: number) => {
    setSpeed(customValue);
  };

  // Value that will be passed to context consumers
  const value: contextProps = {
    speed,
    changeSpeed,
  };

  // pass the values to the provider and render the children
  return (
    <MarqueeContext.Provider value={value}>{children}</MarqueeContext.Provider>
  );
};
