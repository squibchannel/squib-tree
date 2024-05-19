import React, { ReactNode } from "react";
import { MarqueeProvider } from "@/providers/marquee-provider";

interface Props {
  children: ReactNode;
}

export default function layout({ children }: Props) {
  return <MarqueeProvider>{children}</MarqueeProvider>;
}
// its server side so and can be dynamic and stuff
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
