import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Hero } from "@/components/Hero"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { abStories, wines } from "@/lib/data"
import type { Wine } from "@/lib/types"

type WinePageParams = {
  slug: string
  vintage: string
}

const getWineData = (slug: string, vintage: number) => {
  const wine = wines.find((item) => item.slug === slug)
  if (!wine) return null

  const vintageInfo = wine.vintages.find((item) => item.year === vintage)
  if (!vintageInfo) return null

  const relatedStories = abStories.filter(
    (story) => story.wineSlug === slug && story.vintage === vintage,
  )

  return { wine, vintageInfo, relatedStories }
}

export function generateStaticParams() {
  return wines.flatMap((wine) =>
    wine.vintages.map((vintage) => ({
      slug: wine.slug,
      vintage: String(vintage.year),
    })),
  )
}

export function generateMetadata({
  params,
}: {
  params: WinePageParams
}): Metadata {
  const vintageYear = Number(params.vintage)
  const data = getWineData(params.slug, vintageYear)

  if (!data) {
    return {
      title: "Vino no encontrado",
    }
  }

  const { wine } = data

  return {
    title: `${wine.name} ${vintageYear}`,
    description: wine.storyTagline,
    openGraph: {
      title: `${wine.name} ${vintageYear}`,
      description: wine.storyTagline,
      images: [
        {
          url: wine.heroImage,
          width: 800,
          height: 1200,
          alt: `${wine.name} botella`,
        },
      ],
    },
  }
}

type WineDetailProps = {
  params: WinePageParams
}

const TechnicalCard = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => (
  <Card className="border border-ink/50 bg-ink/40">
    <CardContent className="space-y-2 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">{label}</p>
      <p className="font-serif text-2xl tracking-[0.1em] text-foreground">{value}</p>
    </CardContent>
  </Card>
)

const Gallery = ({ wine }: { wine: Wine }) => {
  if (!wine.gallery?.length) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {wine.gallery.map((image) => (
        <div
          key={image}
          className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-ink/60 bg-ink/40"
        >
          <Image
            src={image}
            alt={`${wine.name} detalle`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 300px, 400px"
          />
        </div>
      ))}
    </div>
  )
}

export default function WineDetailPage({ params }: WineDetailProps) {
  const vintageYear = Number(params.vintage)
  const data = getWineData(params.slug, vintageYear)

  if (!data) {
    notFound()
  }

  const { wine, vintageInfo, relatedStories } = data

  return (
    <main className="flex flex-col">
      <Hero
        title={`${wine.name} ${vintageInfo.year}`}
        tagline={wine.storyTagline}
        bottleImage={wine.heroImage}
        bottleAlt={wine.name}
        primaryCta={{ label: "Preorder / Buy", href: "/preorder" }}
        secondaryCta={{ label: "Leer historias A/B", href: "/story" }}
      />

      <Section
        kicker="Ficha técnica"
        title="Datos esenciales"
        description="Información pensada para sommeliers, restaurantes y coleccionistas."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <TechnicalCard label="Estilo" value={wine.style.toUpperCase()} />
          <TechnicalCard label="Región" value={wine.region} />
          <TechnicalCard label="ABV" value={`${wine.abv}%`} />
          <TechnicalCard
            label="Producción"
            value={`${vintageInfo.bottles.toLocaleString("es-MX")} botellas`}
          />
          <TechnicalCard
            label="Pares A/B"
            value={`${vintageInfo.abPairs.toLocaleString("es-MX")} dúos`}
          />
          {vintageInfo.sku && <TechnicalCard label="SKU" value={vintageInfo.sku} />}
        </div>
      </Section>

      <Section
        kicker="Narrativa"
        title="Intención de la añada"
        description="Un rosé de prensado directo con estructura salina y final largo. Diseñado para ser bebido lentamente y compartir el relato que acompaña cada código."
      >
        <div className="space-y-6 text-sm text-foreground/70">
          {wine.profile && <p>{wine.profile}</p>}
          <p>
            Cada dúo se entrega con cartas selladas. Guarda la tuya, busca a la persona que
            tenga la otra mitad y escriban un final común. Si descubres lagunas en la historia,
            vuelve a la bodega; a veces los silencios también necesitan maridaje.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-gold px-8 py-6 text-sm uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
            >
              <Link href="/preorder">Reservar dúo</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="border border-ink px-8 py-6 text-sm uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
            >
              <Link href="/story">Leer código A/B</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section kicker="Galería" title="Proceso y terroir">
        <Gallery wine={wine} />
      </Section>

      <Section
        kicker="Historias asociadas"
        title="Códigos vinculados a esta añada"
        description="Recopilamos las historias A/B que acompañan este vino. Usa tu código para descubrir versión completa."
        variant="muted"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {relatedStories.map((story) => (
            <div
              key={story.code}
              className="rounded-2xl border border-ink/50 bg-ink/40 p-5 text-sm text-foreground/70"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gold">
                <span>{story.theme}</span>
                <span>Código {story.code}</span>
              </div>
              <Separator className="my-4 bg-ink/60" />
              <p className="font-serif text-lg leading-relaxed text-foreground/80">{story.a}</p>
              {story.b && (
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  <span className="text-gold">Historia B:</span> {story.b}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="ghost"
            className="border border-ink px-8 py-6 text-sm uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
          >
            <Link href="/story">Ver todas las historias</Link>
          </Button>
        </div>
      </Section>
    </main>
  )
}
