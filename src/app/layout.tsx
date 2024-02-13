"use client"
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <SessionProvider>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </SessionProvider>
    </html>
  );
}
