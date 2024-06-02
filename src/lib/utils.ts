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
