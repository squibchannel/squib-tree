import SendMessageZodReactForm from "@/components/SendMessageZodReactForm";
import TwitchChatters from "@/components/TwitchChatters";
import React from "react";

function ChatPage() {
  return (
    <div>
      <SendMessageZodReactForm />
      <TwitchChatters />
    </div>
  );
}

export default ChatPage;
