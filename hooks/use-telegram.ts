"use client"

import { useContext } from "react"
import { TelegramContext } from "@/components/telegram-provider"

export function useTelegram() {
  return useContext(TelegramContext)
}
