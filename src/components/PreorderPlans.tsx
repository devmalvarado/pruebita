import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { preorderPlans } from "@/lib/data";
import { cn } from "@/lib/utils";

type PreorderPlansProps = {
  onSelect?: (planId: string) => void;
  ctaLabel?: string;
  showFooterNote?: boolean;
  linkHref?: string;
  selectedPlanId?: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export function PreorderPlans({
  onSelect,
  ctaLabel = "Preordenar",
  showFooterNote = true,
  linkHref,
  selectedPlanId,
}: PreorderPlansProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {preorderPlans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            "flex h-full flex-col border border-gold/25 bg-black/50 transition",
            selectedPlanId === plan.id && "border-gold/60 shadow-[0_0_25px_rgba(189,159,87,0.2)]",
          )}
        >
          <CardHeader>
            <CardTitle className="text-2xl text-gold">{plan.title}</CardTitle>
            <CardDescription className="text-foreground/70">
              {plan.description}
            </CardDescription>
            <p className="text-3xl font-semibold text-foreground">
              {formatCurrency(plan.price)}
            </p>
          </CardHeader>
          <CardContent className="flex-1 space-y-3 text-sm text-foreground/70">
            {plan.details.map((detail) => (
              <div
                key={detail}
                className="flex items-center gap-2 text-left leading-relaxed"
              >
                <span aria-hidden className="text-gold">●</span>
                <span>{detail}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-ink/60 bg-black/40 p-6">
            <Button
              className="w-full bg-gold text-background hover:bg-gold/90"
              {...(onSelect
                ? {
                    onClick: () => onSelect(plan.id),
                  }
                : {
                    asChild: Boolean(linkHref),
                  })}
            >
              {linkHref && !onSelect ? (
                <Link href={linkHref}>{ctaLabel}</Link>
              ) : (
                ctaLabel
              )}
            </Button>
            {showFooterNote && (
              <p className="text-xs text-foreground/50">
                Entrega estimada diciembre 2026 · Limitado a 700 A + 700 B
              </p>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
