import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Vintage, Wine } from "@/lib/types";

type WineCardProps = {
  wine: Wine;
  vintage: Vintage;
};

export function WineCard({ wine, vintage }: WineCardProps) {
  const href = `/wine/${wine.slug}/${vintage.year}`;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border border-ink/70 bg-gradient-to-br from-ink/80 via-ink/50 to-black">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gold/80">
          <span>{wine.style}</span>
          <span>{vintage.year}</span>
        </div>
        <CardTitle className="text-2xl font-semibold">{wine.name}</CardTitle>
        <CardDescription className="text-foreground/65">
          {wine.storyTagline}
        </CardDescription>
      </CardHeader>
      <div className="relative mx-auto mt-4 flex w-full max-w-[220px] flex-1 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl transition duration-500 group-hover:bg-gold/20" />
        <Image
          src={wine.heroImage}
          alt={`Botella ${wine.name}`}
          width={210}
          height={360}
          className="relative z-10 transition duration-500 group-hover:-translate-y-2"
        />
      </div>
      <CardFooter className="mt-6 flex items-center justify-between border-t border-ink/60 bg-black/40 p-6">
        <div className="text-sm text-foreground/65">
          {vintage.bottles.toLocaleString("es-MX")} botellas ·{" "}
          {vintage.abPairs.toLocaleString("es-MX")} pares A/B
        </div>
        <Button
          asChild
          size="sm"
          className="bg-gold text-background hover:bg-gold/90"
        >
          <Link href={href}>Descubrir</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
