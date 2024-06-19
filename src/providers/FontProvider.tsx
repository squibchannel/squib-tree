"use client";

import { FontKey, fontMap } from "@/lib/const";
import { createContext, useContext, useState } from "react";

interface FontContextType {
  currentFont: string;
  setFont: (font: FontKey) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentFont, setCurrentFont] = useState<string>(() => {
    // if (typeof window !== "undefined") {
    const storedFont = localStorage.getItem("selectedFont");
    return storedFont ? storedFont : fontMap[FontKey.Silkscreen];
    // } else {
    //   return fontMap[FontKey.Silkscreen]; // Fallback in non-browser environment
    // }
  });

  const setFont = (font: FontKey) => {
    setCurrentFont(fontMap[font]);
    localStorage.setItem("selectedFont", fontMap[font]);
  };

  return (
    <FontContext.Provider value={{ currentFont, setFont }}>
      {children}
    </FontContext.Provider>
  );
};
