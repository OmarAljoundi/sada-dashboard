"use client";
import { FC, useEffect, useState } from "react";
import { Notifications } from "../ui/notification";
import { QueryClient, QueryClientProvider } from "react-query";
import { cn } from "@/lib/utils";
import { SideMenu } from "../layout/side-menu";
import { usePathname } from "next/navigation";
const ClientProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mount, setMount] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Notifications position={"topRight"}>
        <div className="h-full relative">
          <div
            className={cn(
              pathname.includes("login")
                ? "hidden"
                : "h-full md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] "
            )}
          >
            <SideMenu />
          </div>
          <main
            className={cn(pathname.includes("login") ? "" : "md:ps-72 pe-8")}
          >
            <div className="mx-auto pt-16">{children}</div>
          </main>
        </div>
      </Notifications>
    </QueryClientProvider>
  );
};

export default ClientProvider;
