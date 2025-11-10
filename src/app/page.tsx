import Link from "next/link";
import type { Metadata } from "next";

import { Hero } from "@/components/Hero";
import { PreorderPlans } from "@/components/PreorderPlans";
import { Section } from "@/components/Section";
import { StoryLookup } from "@/components/StoryLookup";
import { StoryQuote } from "@/components/StoryQuote";
import { WineCard } from "@/components/WineCard";
import { Button } from "@/components/ui/button";
import { communityStories, wines } from "@/lib/data";

const featuredWine = wines[0];
const featuredVintage = featuredWine.vintages[0];
const highlightedStories = communityStories.slice(0, 3);

export const metadata: Metadata = {
  title: "Every bottle tells a story",
  description:
    "Círculo Rosé de Prensa 2026: 700 parejas A/B listas para encontrarse. Descubre la filosofía VIATERRA, consulta tu historia y asegura tu preventa.",
  openGraph: {
    title: "VIATERRA | Every bottle tells a story",
    description:
      "Círculo Rosé de Prensa 2026. Historias A/B y preventas limitadas desde Aguascalientes.",
    images: [
      {
        url: "https://viaterra.mx/og/viaterra-og.jpg",
        width: 1200,
        height: 630,
        alt: "Botella Círculo Rosé con destellos dorados",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Hero heroImage={featuredWine.heroImage} wineName={featuredWine.name} />

      <Section
        eyebrow="Nuestra filosofía"
        title="Intención en cada detalle"
        description="Trabajamos en series diminutas. Seleccionamos parcelas, contamos historias A/B y conectamos experiencias: un viaje sensorial que inicia en Aguascalientes y termina con quienes comparten el brindis."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-ink/60 bg-black/40 p-6">
            <h3 className="text-xl font-semibold text-gold">Prensa nocturna</h3>
            <p className="text-base text-foreground/70">
              Cosechamos al caer la noche para conservar frescura y quietud.
              Cada botella se etiqueta manualmente con un código A o B,
              pensadas para vivir en pareja.
            </p>
          </div>
          <div className="space-y-4 rounded-xl border border-ink/60 bg-black/40 p-6">
            <h3 className="text-xl font-semibold text-gold">
              Historias que se entrelazan
            </h3>
            <p className="text-base text-foreground/70">
              Escribe tu código en la memoria. Cuando la contraparte aparece,
              el relato cobra sentido completo. Cada dúo de botellas guarda dos
              versiones del mismo momento.
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Vino destacado"
        title={featuredWine.name}
        description="Un rosé de prensa directa, mineral y preciso, nacido en suelos volcánicos y criado para revelar dos narrativas paralelas."
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <WineCard wine={featuredWine} vintage={featuredVintage} />
          <div className="space-y-6 rounded-2xl border border-ink/60 bg-black/40 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold">
                Notas
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-foreground/70">
                {featuredWine.notes.map((note) => (
                  <li key={note} className="rounded border border-ink/60 p-3">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-gold">
                Disponibilidad
              </p>
              <p className="text-sm text-foreground/65">
                {featuredVintage.bottles.toLocaleString("es-MX")} botellas ·{" "}
                {featuredVintage.abPairs.toLocaleString("es-MX")} pares A/B
              </p>
            </div>
            <Button
              asChild
              className="w-full bg-gold text-background hover:bg-gold/90"
            >
              <Link href={`/wine/${featuredWine.slug}/${featuredVintage.year}`}>
                Explorar ficha técnica
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Historia A/B"
        title="Busca tu código y comparte la experiencia"
        description="Ingresa tu código para conocer las dos caras de la historia. Si aún no encuentras la contraparte, comparte la tuya y deja que el universo la encuentre."
        align="center"
      >
        <StoryLookup variant="inline" />
      </Section>

      <Section
        eyebrow="Preventa limitada"
        title="Asegura tu edición 2026"
        description="Dos planes diseñados para crear memoria: resguarda tu botella individual o comparte el par completo A+B."
      >
        <PreorderPlans linkHref="/preorder" />
      </Section>

      <Section
        eyebrow="Historias de la comunidad"
        title="Los códigos que ya encontraron su eco"
        description="Relatos cortos enviados por coleccionistas, sommeliers, chefs y parejas que guardan su botella como un recuerdo vivo."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {highlightedStories.map((story) => (
            <StoryQuote key={story.id} story={story} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="border-gold/50 text-gold hover:bg-gold/10"
          >
            <Link href="/stories">Ver todas las historias</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
