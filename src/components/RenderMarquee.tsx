"use client";

import React from "react";
import Marquee from "./ui/marquee";
import TagCard from "./TagCard";
import useTags from "@/hooks/useTags";

function RenderMarquee() {
  const { currentTags } = useTags();

  return (
    <Marquee pauseOnHover reverse>
      {currentTags.map((tag, index) => (
        <TagCard key={index} tag={tag} />
      ))}
    </Marquee>
  );
}

export default RenderMarquee;
