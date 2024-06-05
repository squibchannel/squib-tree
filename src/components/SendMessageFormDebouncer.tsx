"use client";

import { sendChatMessage } from "@/actions/twitchRequests";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

/*
    Page layouts default to server
    But in our actions we had a zod error because it was trying to send requests as client
    WE DID NOT specify "use server" in client

    THIS HERE IS A COMPONENT THAT IS CLIENT SIDE... SOOOOO
    Our page layout can remain "SSR" (server side rendering)
*/

function SendMessageFormDebouncer() {
  const [message, setMessage] = useState("");
  const debouncedMessage = useDebounce(message, 500);

  // handle change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const sendMessage = async () => {
      // our "sendChatMessage()" is server side
      //   even though we are sending the request from this component which is client side
      try {
        if (!debouncedMessage || debouncedMessage.length === 0) return;

        // Think about emotes and how to convert when sending the message
        await sendChatMessage(debouncedMessage);
        toast.success("message send");
        setMessage("");
      } catch (error) {
        console.log(error);
        toast.error("failed to send message");
      }
    };

    sendMessage();
  }, [debouncedMessage]);

  return (
    <div className="w-[50vw] mx-auto mt-5 flex flex-row gap-1">
      <Input value={message} onChange={handleChange} />
      {/* <Button onClick={}>Send MSG</Button> */}
    </div>
  );
}

export default SendMessageFormDebouncer;
