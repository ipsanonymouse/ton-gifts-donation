"use client"

import WebApp from '@twa-dev/sdk';
import { useEffect } from "react"

export default function TelegramWebAppScript() {
  useEffect(() => {
    WebApp.ready();
  }, [])

  return null
}
