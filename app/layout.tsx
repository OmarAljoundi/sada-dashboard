import { Notifications } from "@/components/ui/notification";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { SideMenu } from "@/components/layout/side-menu";
import ClientProvider from "@/components/common/client-provider";
import { cn } from "@/lib/utils";

const rubik = Rubik({
  subsets: ["latin"],
  style: "normal",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={cn("h-full w-full", rubik.className)}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
