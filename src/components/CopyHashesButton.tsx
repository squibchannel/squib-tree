"use client";

import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Props {
  testTags: string[];
}

function CopyHashesButton({ testTags }: Props) {
  const handleHashClick = () => {
    navigator.clipboard.writeText(testTags.join(", "));
    toast.success(`All ${testTags.length} hashes copied to clipboard!`, {
      position: "bottom-right",
    });
  };
  return (
    <Button onClick={handleHashClick} className="w-[15%] mt-3 mx-auto">
      Copy Hashes
    </Button>
  );
}

export default CopyHashesButton;
