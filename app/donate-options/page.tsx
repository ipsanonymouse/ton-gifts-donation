import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TonLogo } from "@/components/ton-logo"
import Link from "next/link"
import { Star, Coins } from "lucide-react"

export default function DonateOptionsPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8 flex flex-col min-h-screen">
      <header className="flex justify-center mb-8">
        <TonLogo className="h-12 w-auto" />
      </header>

      <div className="flex-1 flex flex-col justify-center gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Выберите способ доната</h1>
        <p className="text-center text-muted-foreground mb-6">Поддержите развитие проектов на TON</p>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid gap-4">
              <Link href="/donate-stars">
                <Button variant="default" size="lg" className="w-full bg-primary hover:bg-primary/90 gap-2">
                  <Star className="h-5 w-5" />
                  Донат Telegram Stars
                </Button>
              </Link>

              <Link href="/donate-ton">
                <Button variant="outline" size="lg" className="w-full border-primary/50 hover:bg-primary/10 gap-2">
                  <Coins className="h-5 w-5" />
                  Донат TON
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">© 2025 TON Donation</footer>
    </div>
  )
}
