"use client";

import React from "react";
import { Button } from "./ui/button";
import { sendChatMessage } from "@/actions/twitchRequests";

function ShoutoutButton({ follower }: any) {
  return (
    <Button
      onClick={() =>
        sendChatMessage(
          `Huge Shoutout to one of my coolest followers! Thanks for hanging around @${follower.user_name}`
        )
      }
    >
      Shoutout
    </Button>
  );
}

export default ShoutoutButton;
