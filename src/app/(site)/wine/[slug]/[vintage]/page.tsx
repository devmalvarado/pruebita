import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/Section";
import { wines } from "@/lib/data";

type Params = {
  slug: string;
  vintage: string;
};

function getWineData({ slug, vintage }: Params) {
  const year = Number(vintage);
  const wine = wines.find((item) => item.slug === slug);
  const vintageInfo = wine?.vintages.find((item) => item.year === year);
  if (!wine || !vintageInfo) {
    return null;
  }

  return { wine, vintageInfo, year };
}

export async function generateStaticParams() {
  return wines.flatMap((wine) =>
    wine.vintages.map((vintage) => ({
      slug: wine.slug,
      vintage: vintage.year.toString(),
    }))
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const data = getWineData(params);
  if (!data) {
    return {
      title: "Vino no encontrado",
    };
  }

  const { wine, year } = data;
  return {
    title: `${wine.name} ${year} | Círculo Interior`,
    description: `Ficha técnica de ${wine.name} ${year}. Rosé de prensa limitado a ${wine.vintages[0].abPairs} pares A/B, elaborado en ${wine.region}.`,
    openGraph: {
      title: `${wine.name} ${year}`,
      description: wine.storyTagline,
      images: [
        {
          url: wine.heroImage,
          width: 800,
          height: 1200,
          alt: `${wine.name} ${year}`,
        },
      ],
    },
  };
}

const galleryImages = [
  {
    src: "/images/gallery/prensa-rose-barrels.svg",
    alt: "Barricas de roble alineadas en cava oscura",
  },
  {
    src: "/images/gallery/prensa-rose-press.svg",
    alt: "Detalle de la prensa tradicional utilizada en la vinificación",
  },
  {
    src: "/images/gallery/prensa-rose-service.svg",
    alt: "Servicio del rosé en copa borgoña sobre mesa negra",
  },
];

export default function WineDetailPage({ params }: { params: Params }) {
  const data = getWineData(params);
  if (!data) {
    notFound();
  }

  const { wine, vintageInfo, year } = data!;

  return (
    <div className="space-y-0">
      <section className="relative w-full overflow-hidden border-b border-ink/60 bg-gradient-to-b from-black via-black/80 to-ink/80 py-16">
        <div className="container grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              {wine.style.toUpperCase()} · {wine.region} · {year}
            </p>
            <h1 className="text-4xl font-serif sm:text-5xl">{wine.name}</h1>
            <p className="text-lg text-zinc-300">{wine.storyTagline}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-gold px-6 py-3 text-black hover:bg-[#d1b369]"
              >
                <Link href="/preorder">Preorder / Buy</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-gold px-6 py-3 text-gold hover:bg-ink"
              >
                <Link href="/story">Read A/B story</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative h-[420px] w-[180px] overflow-hidden rounded-full border border-ink/60 bg-gradient-to-b from-black/30 to-black/80 p-6 md:h-[520px] md:w-[220px]">
              <Image
                src={wine.heroImage}
                alt={`${wine.name} ${year}`}
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-black/50 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Card className="border border-ink/60 bg-black/70 text-white">
            <CardContent className="space-y-6 p-8">
              <h2 className="text-2xl font-serif text-gold">Ficha técnica</h2>
              <dl className="grid gap-4 text-sm">
                <InfoRow label="Año" value={year} />
                <InfoRow label="Estilo" value={wine.style.toUpperCase()} />
                <InfoRow label="Región" value={wine.region} />
                <InfoRow label="ABV" value={`${wine.abv}%`} />
                <InfoRow
                  label="Botellas"
                  value={`${vintageInfo.bottles} (${vintageInfo.abPairs} pares A/B)`}
                />
                <InfoRow label="SKU" value={vintageInfo.sku ?? "Por definir"} />
              </dl>
            </CardContent>
          </Card>
          <Card className="border border-ink/60 bg-black/70 text-white">
            <CardContent className="space-y-5 p-8">
              <h2 className="text-2xl font-serif text-gold">Notas de cata</h2>
              <ul className="space-y-3 text-sm text-zinc-300">
                {wine.notes.map((note) => (
                  <li key={note} className="flex items-start gap-3">
                    <span className="mt-1 h-1 w-6 bg-gold" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="Galería del terroir"
        description="Texturas, procesos y momentos que dieron forma a la añada."
        className="bg-black/40 py-16"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {galleryImages.map((image) => (
            <figure
              key={image.src}
              className="group relative overflow-hidden rounded-3xl border border-ink/60"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={600}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-xs uppercase tracking-[0.2em] text-gold">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/50 pb-2">
      <dt className="text-xs uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </dt>
      <dd className="text-sm text-zinc-100">{value}</dd>
    </div>
  );
}
