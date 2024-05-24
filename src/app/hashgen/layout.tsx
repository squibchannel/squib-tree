import React, { ReactNode } from "react";
import { HashtagProvider } from "@/providers/hashtag-provider";
import { testTags } from "@/lib/const";

interface Props {
  children: ReactNode;
}

// Write a side job that updates every 24 hours and replaces
// the default tags our provider will pass this

export default function HashLayout({ children }: Props) {
  return <HashtagProvider defaultTags={testTags}>{children}</HashtagProvider>;
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
