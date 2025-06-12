"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"

interface Transaction {
  to: string
  value: number
  message?: string
}

interface TonConnectContextType {
  connected: boolean
  connecting: boolean
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
  sendTransaction: (tx: Transaction) => Promise<void>
}

export const TonConnectContext = createContext<TonConnectContextType>({
  connected: false,
  connecting: false,
  address: null,
  connect: async () => {},
  disconnect: () => {},
  sendTransaction: async () => {},
})

export function TonConnectProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  // Подключение к TON Connect
  const connect = async () => {
    try {
      setConnecting(true)

      // В реальном приложении здесь будет использоваться TON Connect SDK
      // Для демонстрации используем имитацию
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Генерация случайного адреса для демонстрации
      const mockAddress =
        "UQ" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      setAddress(mockAddress)
      setConnected(true)

      // Сохраняем в localStorage для сохранения состояния между сессиями
      localStorage.setItem("ton_connected", "true")
      localStorage.setItem("ton_address", mockAddress)
    } catch (error) {
      console.error("Failed to connect:", error)
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
    localStorage.removeItem("ton_connected")
    localStorage.removeItem("ton_address")
  }

  const sendTransaction = async (tx: Transaction) => {
    if (!connected) throw new Error("Not connected")

    // В реальном приложении здесь будет использоваться TON SDK
    // Для демонстрации используем имитацию
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Transaction sent:", tx)

    return
  }

  // Проверяем сохраненное состояние при загрузке
  useEffect(() => {
    const savedConnected = localStorage.getItem("ton_connected") === "true"
    const savedAddress = localStorage.getItem("ton_address")

    if (savedConnected && savedAddress) {
      setConnected(true)
      setAddress(savedAddress)
    }
  }, [])

  return (
    <TonConnectContext.Provider
      value={{
        connected,
        connecting,
        address,
        connect,
        disconnect,
        sendTransaction,
      }}
    >
      {children}
    </TonConnectContext.Provider>
  )
}
