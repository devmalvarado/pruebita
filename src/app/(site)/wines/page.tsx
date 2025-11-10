import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { WineCard } from "@/components/WineCard";
import { wines } from "@/lib/data";

export const metadata: Metadata = {
  title: "Catálogo de vinos | Círculo Interior",
  description:
    "Explora las ediciones actuales de Círculo Interior. Rosés de prensa con producción limitada y códigos A/B.",
};

export default function WinesPage() {
  return (
    <Section
      eyebrow="Catálogo"
      title="Ediciones activas"
      description="Diseñamos nuestras ediciones para escalar de forma controlada. Cada nueva añada se integra al catálogo con la misma estructura A/B."
      className="min-h-[80vh] border-none bg-black/40 pb-24 pt-24"
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {wines.map((wine) =>
          wine.vintages.map((vintage) => (
            <WineCard key={`${wine.slug}-${vintage.year}`} wine={wine} vintage={vintage.year} />
          ))
        )}
      </div>
    </Section>
  );
}
