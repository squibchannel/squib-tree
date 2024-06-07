import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmbeddedClip from "./EmbeddedClip";

interface ClipCardProps {
  clipTitle: string;
  viewCount: number;
  embedUrl: string;
  clipCreator: string;
  clipId: string;
}

function ClipCard({
  clipTitle,
  viewCount,
  embedUrl,
  clipCreator,
  clipId,
}: ClipCardProps) {
  return (
    <Card className="min-w-fit">
      <CardHeader>
        <CardTitle>{clipTitle}</CardTitle>
        <CardDescription>{`View Count: ${viewCount}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <EmbeddedClip
          height="300"
          width="100%"
          embed_url={embedUrl}
          autoplay={false}
          muted={true}
          key={clipId + `-${clipTitle}`}
        />
      </CardContent>
      <CardFooter>
        <p>{`Created By: ${clipCreator}`}</p>
      </CardFooter>
    </Card>
  );
}

export default ClipCard;
