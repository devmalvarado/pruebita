import Image from "next/image";
import Link from "next/link";
import { Wine } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type WineCardProps = {
  wine: Wine;
  vintage: number;
};

export function WineCard({ wine, vintage }: WineCardProps) {
  return (
    <Card className="group flex h-full flex-col border border-ink/70 bg-gradient-to-b from-ink/30 to-black/60 text-white transition hover:border-gold/80">
      <CardHeader className="flex-1 space-y-4">
        <div className="relative mx-auto h-64 w-40">
          <Image
            src={wine.heroImage}
            alt={`${wine.name} ${vintage}`}
            fill
            className="object-contain"
          />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-serif text-gold">{wine.name}</h3>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
            {vintage}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-center text-sm text-zinc-300">
        <p>
          {wine.style.toUpperCase()} · {wine.region} · {wine.abv}% ABV
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">
          {wine.vintages[0].abPairs} pares A/B
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button
          asChild
          className="rounded-full bg-gold px-6 py-2 text-sm font-semibold text-black hover:bg-[#d1b369]"
        >
          <Link href={`/wine/${wine.slug}/${vintage}`}>Descubrir</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
