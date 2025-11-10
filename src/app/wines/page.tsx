import type { Metadata } from "next";

import { Section } from "@/components/Section";
import { WineCard } from "@/components/WineCard";
import { wines } from "@/lib/data";

export const metadata: Metadata = {
  title: "Colección de vinos",
  description:
    "Explora la colección de VIATERRA: vinos mexicanos de edición limitada con códigos A/B listos para encontrar su contraparte.",
};

export default function WinesPage() {
  return (
    <Section
      eyebrow="Colección"
      title="Ediciones limitadas de VIATERRA"
      description="Cada vino nace con un plan de storytelling A/B y un número finito de botellas. Descubre su origen, notas y disponibilidad."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {wines.map((wine) =>
          wine.vintages.map((vintage) => (
            <WineCard key={`${wine.slug}-${vintage.year}`} wine={wine} vintage={vintage} />
          )),
        )}
      </div>
    </Section>
  );
}
