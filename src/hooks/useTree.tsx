"use client";

import { TreeContext, TreeContextType } from "@/providers/TreeProvider";
import { useContext } from "react";

function useTree(): TreeContextType {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error("useTag must be used within a hashtagProvider");
  }
  return context;
}

export default useTree;
