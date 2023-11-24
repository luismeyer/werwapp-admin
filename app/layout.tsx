import "./globals.css";
import "@uploadthing/react/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Werwapp Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed z-50 bg-white w-screen p-2 flex justify-center shadow-sm">
          <Navigation />
        </div>

        <div className="h-screen w-screen pt-28 px-12">{children}</div>

        <Toaster />
      </body>
    </html>
  );
}
