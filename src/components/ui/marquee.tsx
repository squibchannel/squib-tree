"use client";
import { cn } from "@/lib/utils";
import useMarquee from "@/hooks/useMarquee";
import { useRef, useEffect } from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const { speed } = useMarquee();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // check if we have the ref

    if (containerRef && containerRef.current) {
      console.log("set speed");

      const existingDuration = containerRef.current.style.getPropertyValue(
        `--duration:${speed}s`
      );
      if (existingDuration) {
        console.log("does exist" + existingDuration);
      }

      containerRef.current.style.setProperty(
        `--duration:${speed}s`,
        `${speed}s`
      );
      return;
    }

    console.log("ref not found");
  }, [speed, containerRef]);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden p-2  [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              }
              // IDK pretty sure it does not work with the slider
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// gonna try 1 more thing
// move the slider
