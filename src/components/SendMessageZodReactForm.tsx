"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { chatFormSchema } from "@/schema/chatForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendChatMessage } from "@/actions/twitchRequests";
import { toast } from "sonner";
import { Card } from "./ui/card";

function SendMessageZodReactForm() {
  const chatForm = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      chatMsg: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof chatFormSchema>) => {
    const { chatMsg } = values;
    try {
      await sendChatMessage(chatMsg);
      toast.success("Message Successfully Sent");
      chatForm.reset();
    } catch (error) {
      toast.error("Message failed to send");
    }
  };

  return (
    <Card className=" w-[50vw] mx-auto mt-4 p-4">
      <Form {...chatForm}>
        <form onSubmit={chatForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={chatForm.control}
            name="chatMsg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chat Message</FormLabel>
                <FormControl>
                  <Input placeholder="Hello World!" {...field} />
                </FormControl>
                <FormDescription>
                  Send a chat message to your own chat!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>
    </Card>
  );
}

export default SendMessageZodReactForm;
