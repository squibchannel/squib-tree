"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  tag: string;
}

export default function TagCard({ tag }: Props) {
  const handleClick = () => {
    // copy to clip board
    navigator.clipboard.writeText(tag);

    toast.success(`${tag} has been copied to your clipboard`);
  };

  return (
    <figure
      onClick={handleClick}
      className={cn(
        "relative h-40 w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2 justify-center h-full">
        <div className="flex flex-col">#{tag}</div>
      </div>
    </figure>
  );
}
