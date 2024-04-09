"use client";
import React, { useEffect, useState } from "react";
import { LogOut, UsersIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MenuItems = [
  {
    label: "Reservations",
    href: "/reservations",
    icon: LayoutDashboardIcon,
    logout: null,
  },
  {
    label: "Clients",
    href: "/clients",
    icon: UsersIcon,
    logout: null,
  },
];
const supabase = createClientComponentClient();
export const SideMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };
  return (
    <div className="mt-10">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3
         text-sm rounded-lg sm:hidden
          focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mb-10"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          {/* <Image
            src="/sada-logo.png"
            width={200}
            height={175}
            alt="image-logo"
            className="w-"
          />
          */}
          <Separator className="my-4" />
          <ul className="space-y-2 font-medium">
            {MenuItems.map((i) => (
              <li key={i.label}>
                <Link
                  href={i.href}
                  className={cn(
                    "flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 group",
                    pathname.includes(i.href) ? "bg-gray-700" : ""
                  )}
                >
                  <i.icon />
                  <span className="ml-3">{i.label}</span>
                </Link>
              </li>
            ))}
            <li key={"logout"}>
              <span
                onClick={() => logout()}
                className="flex items-center p-2 rounded-lg text-white
                 hover:bg-gray-700 group cursor-pointer"
              >
                <LogOut />
                <span className="ml-3">Logout</span>
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
