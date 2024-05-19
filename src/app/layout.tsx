import type { Metadata } from "next";
import { Inter, Silkscreen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });
const silk = Silkscreen({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linktree Clone",
  description: "Next.js first app!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={silk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
