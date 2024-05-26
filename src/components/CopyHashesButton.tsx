"use client";

import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import useTags from "@/hooks/useTags";

function CopyHashesButton() {
  const { currentTags } = useTags();

  const handleHashClick = () => {
    navigator.clipboard.writeText(currentTags.join(", "));
    toast.success(`All ${currentTags.length} hashes copied to clipboard!`, {
      position: "bottom-right",
    });
  };
  return (
    <Button onClick={handleHashClick} className="w-[15%] mt-8 mx-auto">
      Copy Hashes
    </Button>
  );
}

export default CopyHashesButton;
