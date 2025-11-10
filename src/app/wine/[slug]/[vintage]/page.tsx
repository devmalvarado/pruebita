import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { StoryLookup } from "@/components/StoryLookup";
import { wines } from "@/lib/data";
import { getVintageFromWine, getWineBySlug } from "@/lib/story-utils";

type PageProps = {
  params: { slug: string; vintage: string };
};

export function generateStaticParams() {
  return wines.flatMap((wine) =>
    wine.vintages.map((vintage) => ({
      slug: wine.slug,
      vintage: vintage.year.toString(),
    })),
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const wine = getWineBySlug(params.slug);
  const vintageYear = Number(params.vintage);

  if (!wine) {
    return {
      title: "Vino no encontrado",
    };
  }

  const vintage = getVintageFromWine(wine, vintageYear);
  const pairs = vintage
    ? `${vintage.abPairs.toLocaleString("es-MX")} pares A/B`
    : "Edición limitada";
  const bottles = vintage
    ? `${vintage.bottles.toLocaleString("es-MX")} botellas`
    : "Producción limitada";
  const description = `${wine.storyTagline} ${bottles} · ${pairs}.`;

  return {
    title: `${wine.name} ${vintageYear}`,
    description,
    openGraph: {
      title: `${wine.name} ${vintageYear}`,
      description,
      images: [
        {
          url: `https://viaterra.mx/og/${wine.slug}-${vintageYear}.jpg`,
          width: 1200,
          height: 630,
          alt: `Botella ${wine.name}`,
        },
      ],
    },
  };
}

export default function WineDetailPage({ params }: PageProps) {
  const vintageYear = Number(params.vintage);
  const wine = getWineBySlug(params.slug);

  if (!wine) {
    notFound();
  }

  const vintage = getVintageFromWine(wine, vintageYear);

  if (!vintage) {
    notFound();
  }

  const galleryPlaceholders = [
    "Llenado en frío para preservar aroma de bugambilia.",
    "Fermentado en tanques de acero con descanso lunar.",
    "Degustación privada al amanecer en la cava norte.",
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/60 bg-gradient-to-br from-black via-ink/60 to-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:px-8 md:flex-row md:items-center md:gap-16">
          <div className="space-y-6 md:w-1/2">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              {vintageYear} · {wine.region}
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {wine.name}
            </h1>
            <p className="text-base text-foreground/70 sm:text-lg">
              {wine.storyTagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-gold text-background hover:bg-gold/90"
              >
                <Link href="/preorder">Preordenar</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gold/40 text-gold hover:bg-gold/15"
              >
                <Link href="/story">Leer Historia A/B</Link>
              </Button>
            </div>
            <dl className="grid gap-4 pt-6 text-sm text-foreground/70 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-[0.35em] text-gold">
                  Estilo
                </dt>
                <dd>{wine.style}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.35em] text-gold">
                  ABV
                </dt>
                <dd>{wine.abv}%</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.35em] text-gold">
                  Botellas
                </dt>
                <dd>
                  {vintage.bottles.toLocaleString("es-MX")} ·{" "}
                  {vintage.abPairs.toLocaleString("es-MX")} pares A/B
                </dd>
              </div>
            </dl>
          </div>
          <div className="mx-auto flex flex-col items-center md:w-1/2">
            <div className="relative flex h-[460px] w-[240px] items-end justify-center rounded-full border border-gold/25 bg-gradient-to-b from-white/10 via-ink/40 to-black">
              <div className="absolute inset-x-8 bottom-20 h-36 rounded-full bg-gold/15 blur-3xl" />
              <Image
                src={wine.heroImage}
                alt={`Botella ${wine.name}`}
                width={240}
                height={460}
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Ficha técnica"
        title="Elementos clave de la añada"
        description="Un rosé criado con prensado suave y fermentación lenta. La mineralidad proviene de suelos volcánicos del altiplano hidrocálido."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-ink/60 bg-black/40 p-6">
            <h3 className="text-lg font-semibold text-gold">Vinificación</h3>
            <ul className="mt-3 space-y-3 text-sm text-foreground/70">
              <li>Prensa directa a 8 °C</li>
              <li>Fermentación con levaduras nativas</li>
              <li>Crianza sur lie 4 meses</li>
            </ul>
          </div>
          <div className="rounded-xl border border-ink/60 bg-black/40 p-6">
            <h3 className="text-lg font-semibold text-gold">Notas sensoriales</h3>
            <ul className="mt-3 space-y-3 text-sm text-foreground/70">
              {wine.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-ink/60 bg-black/40 p-6">
            <h3 className="text-lg font-semibold text-gold">Servicio</h3>
            <ul className="mt-3 space-y-3 text-sm text-foreground/70">
              <li>Temperatura ideal: 10 °C</li>
              <li>Decantar 10 minutos antes de servir</li>
              <li>Maridaje: ceviche de huevo de codorniz, pesca blanca, flores comestibles</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Galería"
        title="Un vistazo detrás de la botella"
        description="Momentos que inspiran la narrativa A/B y que hacen única a cada pareja de botellas."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {galleryPlaceholders.map((caption, index) => (
            <figure
              key={caption}
              className="relative min-h-[220px] overflow-hidden rounded-xl border border-ink/60 bg-gradient-to-br from-ink/80 via-ink/50 to-black p-6"
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--gold)/20,transparent_70%)] opacity-80" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="text-xs uppercase tracking-[0.35em] text-gold/70">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <figcaption className="text-sm text-foreground/80">
                  {caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Historias A/B"
        title="Consulta tu código desde la ficha"
        description="Ingresa el código impreso en tu botella para leer las dos versiones del relato."
        align="center"
      >
        <StoryLookup />
      </Section>
    </>
  );
}
