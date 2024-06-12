"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SettingsLinks() {
  const pathname = usePathname();

  function getLinkClass(href: string): string {
    return `font-semibold ${href === pathname ? "text-primary" : ""}`;
  }

  const links = [
    { href: "/dashboard/settings/general", label: "General" },
    { href: "/dashboard/settings/socials", label: "Socials" },
    { href: "/dashboard/settings/keys", label: "Api Keys" },
    { href: "/dashboard/settings/contact", label: "Contact" },
    { href: "/dashboard/settings/advanced", label: "Advanced" },
  ];

  return (
    <>
      {links.map((link) => {
        return (
          <Link href={link.href} className={getLinkClass(link.href)}>
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

export default SettingsLinks;
