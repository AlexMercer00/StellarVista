"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixForge",
  description: "Create, share, and manage your media with PixForge",
};

// Header Component
function Header() {
  const { theme } = useTheme();

  return (
    <header className="w-full flex justify-center py-6 bg-white dark:bg-gray-800 shadow-md">
      <Image
        src={theme === "dark" ? "/logo-light.png" : "/logo-dark.png"}
        alt="PixForge Logo"
        width={180}
        height={48}
        priority
        className="h-12 w-auto sm:h-10"
      />
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class">
        <html lang="en">
          <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
            <Header />
            <main>{children}</main>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}