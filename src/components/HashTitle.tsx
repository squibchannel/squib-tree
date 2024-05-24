"use client";

import useTags from "@/hooks/useTags";
import React from "react";

function HashTitle() {
  const { hashTitle } = useTags();
  return <h3 className="flex justify-center mb-4 text-2xl">{hashTitle}</h3>;
}

export default HashTitle;
