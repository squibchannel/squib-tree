"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";

export const socials: { title: string; href: string; description: string }[] = [
  {
    title: "Twitch",
    href: "https://www.twitch.tv/squib_channel",
    description: "Squib streams live on Twitch most days of the week.",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/Squibchannel",
    description: "Check out Squib's latest tweets and rage bait!",
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@squib-channel",
    description:
      "I put my vods and longer clips here! Video essays coming one day soon.",
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@squib_channel",
    description: "Millenial just trying to heal.",
  },
  {
    title: "Discord",
    href: "https://discord.gg/jFzGVuwx3G",
    description:
      "Join the squib_channel discord to keep up with all the latest news and shenanigans.",
  },
  {
    title: "Github",
    href: "https://github.com/squibchannel",
    description: "I write code sometimes and when I do I put it on the hub.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className="flex items-start">
      <NavigationMenuList className="w-screen h-auto flex-row items-start justify-start p-2">
        <NavigationMenuItem className="">
          <NavigationMenuTrigger>squib_channel</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Hi, I'm Squib!
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      I play video games and write code sometimes.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="https://streamelements.com/squib_channel/tip"
                title="Donate"
                target="_blank"
              >
                100% of all donations will go back into the growth of the
                squib_channel. Non-Refundable.
              </ListItem>
              <ListItem
                href="https://squibchannel@gmail.com"
                title="Contact"
                target="_blank"
              >
                Contact me at squibchannel@gmail.com
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex-auto">
          <NavigationMenuTrigger>socials</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {socials.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  target="_blank"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <ModeToggle></ModeToggle>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
