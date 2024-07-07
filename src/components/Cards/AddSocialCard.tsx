"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useTree from "@/hooks/useTree";
import { SocialProps } from "@/lib/const";
import { socialFormSchema } from "@/schema/SocialForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";

function AddSocialCard() {
  const session = useSession();
  const { addSocialLink } = useTree();

  const form = useForm({
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      platform: "",
      description: "",
      href: "",
    },
  });

  const onSubmit = (data: SocialProps) => {
    addSocialLink(data, session.data?.user.name === "squib_channel");
  };

  return (
    <Card className="max-w-[80%] justify-center">
      <CardHeader className="flex flex-row gap-8 items-center">
        <Button
          className="max-w-[25%] flex-grow"
          onClick={form.handleSubmit(onSubmit)}
        >
          Create
        </Button>
        <CardDescription className="text-primary font-extrabold">
          Add a new social to your profile page!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <FormControl>
                    <Textarea
                      id="platform"
                      placeholder="Enter the social platform here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Enter description of platform here."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="href"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Textarea
                      id="href"
                      placeholder="Enter the entire http link for the platform here."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AddSocialCard;
