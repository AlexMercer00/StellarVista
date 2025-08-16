"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-100">
        {/* Top Navbar */}
        <header className="w-full flex items-center justify-between bg-gray-800 p-4 shadow-md">
          <div className="flex items-center space-x-2">
            <button
              className="lg:hidden btn btn-ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon className="w-6 h-6 text-white" />
            </button>
            <div
              className="cursor-pointer flex items-center"
              onClick={handleLogoClick}
            >
              <Image src="/logo.png" alt="PixForge Logo" width={140} height={40} />
            </div>
          </div>

          {user && (
            <div className="flex items-center space-x-3 text-white">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full">
                  <img
                    src={user.imageUrl}
                    alt={user.username || user.emailAddresses[0].emailAddress}
                  />
                </div>
              </div>
              <span className="hidden sm:inline">
                {user.username || user.emailAddresses[0].emailAddress}
              </span>
              <button onClick={handleSignOut} className="btn btn-ghost btn-circle">
                <LogOutIcon className="w-6 h-6" />
              </button>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-grow p-8">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-gray-900 w-64 min-h-screen flex flex-col">
          <div className="flex items-center justify-center py-6">
            <ImageIcon className="w-10 h-10 text-blue-500" />
          </div>

          <ul className="menu p-4 flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {user && (
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-red-500 w-full text-white border-gray-700 hover:border-red-500 hover:bg-red-600"
              >
                <LogOutIcon className="mr-2 w-5 h-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}