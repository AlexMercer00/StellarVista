import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixForge",
  description: "Create, share, and manage your media with PixForge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
          {/* Top Logo */}
          <header className="w-full flex justify-center py-6 bg-white dark:bg-gray-800 shadow-md">
            <Image
              src="/logo.png"
              alt="PixForge Logo"
              width={180}
              height={10}
              priority
            />
          </header>

          {/* Main App Content */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}