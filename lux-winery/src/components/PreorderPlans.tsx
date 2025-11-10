import { preorderPlans } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type PreorderPlansProps = {
  onSelect?: (planId: "single" | "pair") => void
}

export const PreorderPlans = ({ onSelect }: PreorderPlansProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {preorderPlans.map((plan) => (
        <Card
          key={plan.id}
          className="flex h-full flex-col border border-ink/60 bg-ink/40 transition hover:border-gold/60"
        >
          <CardHeader className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Plan {plan.id}</p>
            <h3 className="font-serif text-3xl tracking-[0.08em] text-foreground">
              {plan.name}
            </h3>
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
              ${plan.price.toLocaleString("es-MX")} MXN
            </p>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4 text-sm text-foreground/70">
            <p>{plan.description}</p>
            <ul className="space-y-2 text-xs uppercase tracking-[0.2em] text-foreground/60">
              {plan.perks.map((perk) => (
                <li key={perk}>• {perk}</li>
              ))}
            </ul>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">
              {plan.limit} · {plan.availability}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              className="w-full bg-gold text-sm uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
              onClick={() => onSelect?.(plan.id)}
            >
              Reservar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
