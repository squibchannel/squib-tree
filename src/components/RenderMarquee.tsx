"use client";

import React from "react";
import Marquee from "./ui/marquee";
import TagCard from "./TagCard";
import useTags from "@/hooks/useTags";
import { cn } from "@/lib/utils";

function RenderMarquee() {
  const { currentTags, image } = useTags();

  return (
    <div
      className="mx-auto relative flex h-96 flex-row items-center justify-center overflow-hidden rounded-lg bg-background border sm:px-20 md:shadow-xl max-w-[90%]"
      style={{
        backgroundImage: `url("${image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Marquee pauseOnHover reverse>
        {currentTags.map((tag, index) => (
          <TagCard key={index} tag={tag} />
        ))}
      </Marquee>
    </div>
  );
}

export default RenderMarquee;
