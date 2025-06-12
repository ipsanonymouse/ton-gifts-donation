"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
    }
  }
  ready: () => void
  expand: () => void
  close: () => void
  sendData: (data: string) => void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
  BackButton: {
    isVisible: boolean
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
  HapticFeedback: {
    impactOccurred: (style: string) => void
    notificationOccurred: (type: string) => void
    selectionChanged: () => void
  }
}

interface TelegramContextType {
  telegram: TelegramWebApp | null
  user: {
    id: number
    first_name: string
    last_name?: string
    username?: string
  } | null
}

export const TelegramContext = createContext<TelegramContextType>({
  telegram: null,
  user: null,
})

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [telegram, setTelegram] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<TelegramContextType["user"]>(null)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      setTelegram(tg)
      tg.ready()

      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user)
      }
    }
  }, [])

  return <TelegramContext.Provider value={{ telegram, user }}>{children}</TelegramContext.Provider>
}

// Добавляем типы для глобального объекта window
declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}
