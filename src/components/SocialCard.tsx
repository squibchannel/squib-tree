"use client";

// import * as React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SocialIcon } from "react-social-icons";

interface SocialCardProps {
  key: string;
  title: string;
  description: string;
  href: string;
}

const bitSounds = [
  "/sounds/8-bit-game-1-186975.mp3",
  "/sounds/8-bit-game-2-186976.mp3",
  "/sounds/8-bit-game-4-188106.mp3",
  "/sounds/8-bit-game-5-188107.mp3",
  "/sounds/8-bit-laser-151672.mp3",
  "/sounds/8-bit-powerup-6768.mp3",
  "/sounds/negative_beeps-6008.mp3",
];

const SocialCard: React.FC<SocialCardProps> = ({
  key,
  title,
  description,
  href,
}) => {
  function playSound(sounds: string[]) {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    const audio = new Audio(sounds[randomIndex]);
    audio.play();
  }

  return (
    <Card id={key + "-social-card"} className="w-min-plus-1rem">
      <CardHeader className="flex-row gap-5 items-center">
        <CardTitle onClick={() => playSound(bitSounds)}>
          <SocialIcon network={title} href={href} target="_blank" />
        </CardTitle>
        <CardDescription className="text-xl font-extrabold">
          {description}
        </CardDescription>
      </CardHeader>
      {/* <CardContent>{content}</CardContent> */}
    </Card>
  );
};

export default SocialCard;
