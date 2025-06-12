import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TelegramProvider } from "@/components/telegram-provider"
import { TonConnectProvider } from "@/components/ton-connect-provider"
import TelegramWebAppScript from "./telegram-web-app-script"
import { WebApp } from '@twa-dev/sdk';
import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "TON Donation",
  description: "Donate via TON or Telegram Stars",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    WebApp.ready();
  }, []);

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <TelegramProvider>
            <TonConnectProvider>
              <main className="min-h-screen flex flex-col">{children}</main>
              <TelegramWebAppScript />
            </TonConnectProvider>
          </TelegramProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
