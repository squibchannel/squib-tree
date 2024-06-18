import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { signIn } from "next-auth/react";
import { TWITCH_SCOPES } from "./const";

// Function to initiate Twitch OAuth flow with updated scopes
export async function initiateTwitchOAuth() {
  await signIn("twitch", { scopes: TWITCH_SCOPES });
}

export function getRandomIndices(max: number, count: number): number[] {
  const indices: number[] = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}
