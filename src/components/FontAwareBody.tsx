"use client";

import { useFont } from "@/providers/FontProvider";
import { ReactNode } from "react";

function FontAwareBody({ children }: { children: ReactNode }) {
  const { currentFont } = useFont(); // Ensure FontProvider wraps this component
  return <body className={currentFont}>{children}</body>;
}

export default FontAwareBody;
