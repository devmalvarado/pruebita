import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { WineCard } from "@/components/WineCard"
import { wines } from "@/lib/data"

export const metadata: Metadata = {
  title: "Colección de vinos",
  description:
    "Explora los vinos de edición limitada de Casa Intención. Diseñados para expandirse hacia futuras añadas y estilos.",
}

export default function WinesPage() {
  return (
    <main className="flex flex-col">
      <Section
        kicker="Colección Casa Intención"
        title="Nuestros vinos"
        description="Una colección en expansión. Cada lanzamiento se concibe para convivir con futuros vinos y añadas simultáneas."
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {wines.map((wine) => (
            <WineCard key={wine.slug} wine={wine} />
          ))}
        </div>
      </Section>
    </main>
  )
}
