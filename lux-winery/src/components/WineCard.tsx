import Image from "next/image"
import Link from "next/link"
import { Wine } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type WineCardProps = {
  wine: Wine
  featuredVintage?: number
}

export const WineCard = ({ wine, featuredVintage }: WineCardProps) => {
  const vintageYear =
    featuredVintage ?? wine.vintages.at(0)?.year ?? new Date().getFullYear()

  return (
    <Card className="group flex h-full flex-col border border-ink/60 bg-ink/60 transition hover:border-gold/60">
      <CardHeader className="space-y-4 pb-0">
        <div className="relative mx-auto mt-6 h-48 w-28 sm:h-56 sm:w-32">
          <div className="absolute inset-0 rounded-[1.5rem] border border-gold/20" />
          <Image
            src={wine.heroImage}
            alt={wine.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 140px, 160px"
          />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">
            {wine.region} · {vintageYear}
          </p>
          <h3 className="font-serif text-2xl tracking-[0.08em] text-foreground">
            {wine.name}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 pt-6">
        <Separator className="bg-ink/60" />
        <div className="space-y-2 text-sm text-foreground/70">
          <p className="uppercase tracking-[0.3em] text-foreground/60">
            {wine.style} · {wine.abv}% ABV
          </p>
          <p>{wine.storyTagline}</p>
          <div className="text-xs uppercase tracking-[0.3em] text-gold">
            {wine.notes.join(" · ")}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          asChild
          className="w-full bg-gold text-sm uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
        >
          <Link href={`/wine/${wine.slug}/${vintageYear}`}>Descubrir</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
