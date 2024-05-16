"use client";

import SquibTitleCard from "@/components/SquibTitleCard";
import { NavigationMenuDemo } from "@/components/SquibNavMenu";
import SocialCard from "@/components/SocialCard";
import { socials } from "@/components/SquibNavMenu";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-around p-24 pt-0 gap-5">
      <NavigationMenuDemo></NavigationMenuDemo>
      <SquibTitleCard></SquibTitleCard>
      {socials.map((social) => (
        <SocialCard
          key={social.title}
          title={social.title.toLowerCase()}
          description={social.description}
          href={social.href}
        />
      ))}
    </main>
  );
}
