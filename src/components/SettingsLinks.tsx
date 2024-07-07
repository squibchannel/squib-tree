"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { settingsLinksList } from "@/lib/const";

function SettingsLinks() {
  const pathname = usePathname();

  function getLinkClass(href: string): string {
    return `font-semibold ${href === pathname ? "text-primary" : ""}`;
  }

  return (
    <>
      {settingsLinksList.map((link) => {
        return (
          <Link
            key={link.label + "-key"}
            href={link.href}
            className={getLinkClass(link.href)}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

export default SettingsLinks;
