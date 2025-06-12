"use client"

import { useEffect } from "react"

export default function TelegramWebAppScript() {
  useEffect(() => {
    // Добавляем скрипт Telegram Web App
    const script = document.createElement("script")
    script.src = "/telegram-web-app.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}
