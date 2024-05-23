"use client";

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
import { socials } from "@/lib/const";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";

export function SquibNavMenu() {
  return (
    <NavigationMenu className="flex items-start fixed top-0">
      <NavigationMenuList className="w-screen h-auto flex-row items-start justify-start p-2 pr-5">
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
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Hi, I&apos;m Squib!
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
        <NavigationMenuItem>
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
        <NavigationMenuItem className="flex-auto">
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem
                key="hashgen-link"
                title="Hash Generator"
                href="/hashgen"
              ></ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <AuthButton />
        <span className="!ml-4">
          <ModeToggle />
        </span>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
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
  }
);

ListItem.displayName = "ListItem";
export { socials };
