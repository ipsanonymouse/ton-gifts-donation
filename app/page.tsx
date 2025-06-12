"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TonLogo } from "@/components/ton-logo"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  const router = useRouter()
  const [animationComplete, setAnimationComplete] = useState(false)
  const [skipAnimation, setSkipAnimation] = useState(false)

  useEffect(() => {
    if (skipAnimation) {
      router.push("/donate-options")
      return
    }

    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [skipAnimation, router])

  useEffect(() => {
    if (animationComplete) {
      router.push("/donate-options")
    }
  }, [animationComplete, router])

  return (
    <div className="container max-w-md mx-auto px-4 py-8 flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="animate-fade-in">
          <TonLogo className="h-24 w-auto mb-8 animate-pulse" />

          <h1 className="text-2xl font-bold text-center mb-6">TON Donation</h1>

          <p className="text-center text-lg mb-8">Донат для развития и продвижения проектов на блокчейне TON</p>

          <Button variant="ghost" className="mx-auto block" onClick={() => setSkipAnimation(true)}>
            Пропустить
          </Button>
        </div>
      </div>
    </div>
  )
}
