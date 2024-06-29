"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SocialIcon } from "react-social-icons";

interface SocialCardProps {
  keyId: string;
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
  keyId,
  title,
  description,
  href,
}) => {
  function playSound(sounds: string[]) {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    const audio = new Audio(sounds[randomIndex]);
    audio.play();
  }

  // handle click event for social card
  const handleClick = () => {
    playSound(bitSounds);

    window.open(href, "_blank");
  };

  return (
    <>
      <Card
        key={keyId + "-social-card"}
        className="hover:bg-slate-950 cursor-pointer"
        onClick={handleClick}
      >
        <CardHeader className="flex-row gap-5 items-center">
          <CardTitle>
            <SocialIcon network={title} href={href} target="_blank" />
          </CardTitle>
          <CardDescription className="text-xl font-extrabold">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

export default SocialCard;
