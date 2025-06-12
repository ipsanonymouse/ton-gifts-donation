"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { useTonConnect } from "@/hooks/use-ton-connect"
import { useTelegram } from "@/hooks/use-telegram"
import { Coins, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

const DONATION_AMOUNTS = [1, 5, 10, 25, 50, 100]
const WALLET_ADDRESS = "UQCD_MsE9DCExmZP1-ILpbPl_DzB2DSkm5xRUn6j6XKtG5lr"

export default function DonatePage() {
  const { connected, connect, sendTransaction } = useTonConnect()
  const { telegram } = useTelegram()
  const [amount, setAmount] = useState<number | "">("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectAmount = (value: number) => {
    setAmount(value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      setAmount("")
      return
    }

    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setAmount(numValue)
    }
  }

  const handleDonate = async () => {
    if (!amount || amount <= 0) return

    try {
      setIsLoading(true)

      if (!connected) {
        await connect()
        return
      }

      // В реальном приложении здесь будет вызов TON SDK для отправки транзакции
      // Для демонстрации используем имитацию успешной отправки
      await sendTransaction({
        to: WALLET_ADDRESS,
        value: amount,
        message: "Donation",
      })

      toast({
        title: "Донат отправлен!",
        description: `Вы отправили ${amount} TON`,
      })

      // Уведомляем бота об отправке доната
      telegram?.sendData(
        JSON.stringify({
          action: "donation_sent",
          amount: amount,
        }),
      )

      setAmount("")
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить донат. Попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <PageHeader title="Отправить донат" description="Поддержите проект с помощью TON" backLink="/" />

      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Выберите сумму (TON)</label>
            <div className="grid grid-cols-3 gap-2">
              {DONATION_AMOUNTS.map((value) => (
                <Button
                  key={value}
                  variant={amount === value ? "default" : "outline"}
                  className={amount === value ? "bg-primary" : ""}
                  onClick={() => handleSelectAmount(value)}
                >
                  {value} TON
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Или введите свою сумму</label>
            <div className="relative">
              <Input
                type="number"
                min="0"
                step="0.1"
                value={amount === "" ? "" : amount}
                onChange={handleAmountChange}
                className="pr-12"
                placeholder="Введите сумму"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">TON</div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-6">
            <p className="mb-2">Адрес кошелька для доната:</p>
            <div className="bg-muted/30 p-2 rounded-md flex items-center justify-between break-all">
              <span className="text-xs">{WALLET_ADDRESS}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-2 flex-shrink-0"
                onClick={() => {
                  navigator.clipboard.writeText(WALLET_ADDRESS)
                  toast({ description: "Адрес скопирован" })
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            className="w-full gap-2"
            size="lg"
            disabled={!amount || amount <= 0 || isLoading}
            onClick={handleDonate}
          >
            <Coins className="h-5 w-5" />
            {!connected ? "Подключить кошелек" : isLoading ? "Отправка..." : `Отправить ${amount || 0} TON`}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
