import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { StoryLookup } from "@/components/StoryLookup";
import { StoryQuote } from "@/components/StoryQuote";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { communityQuotes, wines } from "@/lib/data";
import { siteMetadata } from "@/lib/seo";

const featuredWine = wines[0];
const vintageYear = featuredWine.vintages[0].year;

export const metadata: Metadata = {
  title: `${siteMetadata.siteName} · Ediciones de rosé con historias A/B`,
  description:
    "Prensa Rosé 2026 es una edición limitada creada en Aguascalientes. Descubre historias A/B, preventa y comunidad.",
};

export default function HomePage() {
  return (
    <>
      <Hero wine={featuredWine} vintageYear={vintageYear} />

      <Section
        eyebrow="Nuestra filosofía"
        title="Nada se desperdicia cuando todo se hace con intención"
        description="Controlamos cada instante de la vendimia para capturar texturas minerales, notas florales y la frescura característica de Aguascalientes. Cada botella nace en pares, cada historia se comparte en dualidad."
        className="border-none bg-black/50"
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="h-px w-16 bg-gold" />
            <p className="text-lg text-zinc-300">
              Círculo Interior es una bodega boutique enfocada en ediciones mínimas.
              Producimos 1,400 botellas de Prensa Rosé 2026 — 700 pares A/B — para
              quienes buscan un vino con narrativa personalizable.
            </p>
            <p className="text-lg text-zinc-300">
              Cada botella incluye un código A o B. Ingresa el código y descubre
              relatos complementarios inspirados en los momentos que definieron la
              cosecha.
            </p>
          </div>
          <Card className="border border-ink/60 bg-black/70 text-white">
            <CardContent className="flex h-full flex-col justify-between gap-6 p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-gold">Prensa Rosé 2026</h3>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  {featuredWine.style.toUpperCase()} · {featuredWine.region}
                </p>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {featuredWine.notes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <span className="mt-1 h-1 w-8 bg-gold" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                asChild
                className="self-start rounded-full bg-gold px-6 py-2 text-black hover:bg-[#d1b369]"
              >
                <Link href={`/wine/${featuredWine.slug}/${vintageYear}`}>
                  Descubrir ficha técnica
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Lectura inmediata"
        title="Encuentra tu A/B Story"
        description="Cada código revela dos narrativas que se complementan. Ingresa el tuyo y compártelo con quien tiene el otro extremo."
        className="bg-black/40"
      >
        <StoryLookup />
      </Section>

      <Section
        eyebrow="Preventa 2026"
        title="Resguarda tu par antes de la vendimia"
        description="Reservar ahora garantiza entrega en diciembre de 2026, junto con acceso anticipado a catas privadas y storytelling personalizado."
        className="bg-black/50"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl text-lg text-zinc-300">
            <p>
              Solo fabricaremos 700 pares A+B. Elegimos botellas serigrafiadas en
              dorado para proteger la narrativa y la frescura del vino.
            </p>
          </div>
          <Button
            asChild
            className="rounded-full bg-gold px-8 py-3 text-black hover:bg-[#d1b369]"
          >
            <Link href="/preorder">Ir a preventa</Link>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Comunidad"
        title="Historias que ya se contaron"
        description="Una muestra de las voces que han descubierto su código A/B. Filtra por temas en la sección de comunidad."
        className="border-b-0 bg-black/40 pb-20"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityQuotes.slice(0, 6).map((quote) => (
            <StoryQuote key={quote.id} quote={quote} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-gold px-6 py-2 text-gold hover:bg-ink"
          >
            <Link href="/stories">Ver más historias</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
