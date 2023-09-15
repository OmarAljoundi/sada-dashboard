import { Notifications } from "@/components/ui/notification";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SideMenu } from "@/components/layout/side-menu";
import ClientProvider from "@/components/common/client-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sada Billing System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("h-full w-full", inter.className)}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
