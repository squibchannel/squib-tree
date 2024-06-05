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
  key: string;
}

function ClipCard({
  clipTitle,
  viewCount,
  embedUrl,
  clipCreator,
  key,
}: ClipCardProps) {
  return (
    <Card>
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
        />
      </CardContent>
      <CardFooter>
        <p>{`Created By: ${clipCreator}`}</p>
      </CardFooter>
    </Card>
  );
}

export default ClipCard;
