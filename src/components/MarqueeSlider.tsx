"use client";

import React from "react";
import useMarquee from "@/hooks/useMarquee";
import { Slider } from "@/components/ui/slider";
// omg i can use tab now W

export default function MarqueeSlider() {
  // we are gonna make our life easier
  // you see the TS errors thats one of the reasons why i created a custom hook
  const { changeSpeed, speed } = useMarquee();

  function handleChange(speed: number[]) {
    changeSpeed(speed[0]);

    // BC slider returns a array of numbers i just give the first one
  }

  return (
    <Slider
      onValueChange={handleChange}
      value={[speed]}
      // min speed
      min={50}
      // max speed
      max={500}
    />
  );
}

// this should work if we had a slider
