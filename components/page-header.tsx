import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description?: string
  backLink?: string
}

export function PageHeader({ title, description, backLink }: PageHeaderProps) {
  return (
    <div className="flex flex-col">
      {backLink && (
        <Link href={backLink} className="mb-4">
          <Button variant="ghost" size="sm" className="gap-1 pl-1">
            <ChevronLeft className="h-4 w-4" />
            Назад
          </Button>
        </Link>
      )}

      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </div>
  )
}
