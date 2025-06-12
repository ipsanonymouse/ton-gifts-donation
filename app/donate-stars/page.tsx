"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { useTelegram } from "@/hooks/use-telegram"
import { Star } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface StarAmount {
  id: string
  amount: number
  label: string
}

const STAR_AMOUNTS: StarAmount[] = [
  {
    id: "stars1",
    amount: 10,
    label: "10 Stars",
  },
  {
    id: "stars2",
    amount: 25,
    label: "25 Stars",
  },
  {
    id: "stars3",
    amount: 50,
    label: "50 Stars",
  },
  {
    id: "stars4",
    amount: 100,
    label: "100 Stars",
  },
  {
    id: "stars5",
    amount: 250,
    label: "250 Stars",
  },
  {
    id: "stars6",
    amount: 500,
    label: "500 Stars",
  },
]

export default function DonateStarsPage() {
  const { telegram } = useTelegram()
  const [selectedAmount, setSelectedAmount] = useState<StarAmount | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendStars = async () => {
    if (!selectedAmount) return

    try {
      setIsLoading(true)

      // В реальном приложении здесь будет вызов Telegram Stars API
      // Для демонстрации используем имитацию успешной отправки
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Донат отправлен!",
        description: `Вы отправили ${selectedAmount.amount} Stars`,
      })

      // Уведомляем бота об отправке доната звездами
      telegram?.sendData(
        JSON.stringify({
          action: "stars_sent",
          amount: selectedAmount.amount,
        }),
      )

      setSelectedAmount(null)
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
      <PageHeader
        title="Донат Telegram Stars"
        description="Поддержите проект с помощью Telegram Stars"
        backLink="/donate-options"
      />

      <div className="grid grid-cols-2 gap-4 mt-6">
        {STAR_AMOUNTS.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all ${
              selectedAmount?.id === item.id
                ? "border-primary bg-primary/10"
                : "border-border/50 hover:border-primary/50"
            }`}
            onClick={() => setSelectedAmount(item)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="text-2xl mb-2">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="font-medium">{item.label}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 sticky bottom-4">
        <Button className="w-full gap-2" size="lg" disabled={!selectedAmount || isLoading} onClick={handleSendStars}>
          <Star className="h-5 w-5" />
          {isLoading
            ? "Отправка..."
            : selectedAmount
              ? `Отправить ${selectedAmount.amount} Stars`
              : "Выберите количество Stars"}
        </Button>
      </div>
    </div>
  )
}
