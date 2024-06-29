import React from "react";
import ClipCard from "./ClipCard";
import { Clip } from "@/types/api/twitchAPI";

interface ClipGridProps {
  clips: Clip[];
}

function ClipGrid({ clips }: ClipGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 mx-auto mb-4 mr-4 ml-4">
      {clips &&
        clips.map((clip: Clip) => {
          return (
            <ClipCard
              key={clip.id}
              clipId={clip.id}
              clipTitle={clip.title}
              viewCount={clip.view_count}
              embedUrl={clip.embed_url}
              clipCreator={clip.creator_name}
            />
          );
        })}
    </div>
  );
}

export default ClipGrid;
