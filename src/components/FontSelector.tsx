"use client";

// src/components/FontSelector.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFont } from "@/providers/FontProvider";
import { FontKey } from "@/lib/const";

const fonts = Object.keys(FontKey) as Array<keyof typeof FontKey>;

export default function FontSelector() {
  const { setFont } = useFont();

  return (
    <Select
      onValueChange={(value) => setFont(FontKey[value as keyof typeof FontKey])}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Font" />
      </SelectTrigger>
      <SelectContent>
        {fonts.map((font) => (
          <SelectItem key={font} value={font}>
            {font.replace(/_/g, " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
