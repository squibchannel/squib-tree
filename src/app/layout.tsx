import type { Metadata } from "next";
import { Inter, Silkscreen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { SquibNavMenu } from "@/components/SquibNavMenu";
import { FontProvider, useFont } from "@/providers/FontProvider";
import FontAwareBody from "@/components/FontAwareBody";
// import TwitchSessionProvider from "@/providers/twitch-session-provider";

// const inter = Inter({ subsets: ["latin"] });
const silk = Silkscreen({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linktree Clone",
  description: "Next.js first app!",
  creator: "squib_channel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <FontProvider>
        <FontAwareBody>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SquibNavMenu />

              <main className="mt-20 ">{children}</main>

              <Toaster theme="dark" position="top-center" richColors />
            </ThemeProvider>
          </SessionProvider>
        </FontAwareBody>
      </FontProvider>
    </html>
  );
}
