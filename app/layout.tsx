import { ThemeProvider } from "@/components/providers/theme-provider";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patients Dashboard",
  // description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
