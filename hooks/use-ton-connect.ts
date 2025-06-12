"use client"

import { useContext } from "react"
import { TonConnectContext } from "@/components/ton-connect-provider"

export function useTonConnect() {
  return useContext(TonConnectContext)
}
