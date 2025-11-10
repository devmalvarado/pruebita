import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { StoriesShowcase } from "@/components/StoriesShowcase"
import { communityStories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Historias de la comunidad",
  description:
    "Lee relatos enviados por quienes ya brindaron con Casa Intención. Filtra por tema y encuentra inspiración para tu propia historia A/B.",
}

export default function StoriesPage() {
  return (
    <main className="flex flex-col">
      <Section
        kicker="Comunidad Casa Intención"
        title="Historias compartidas"
        description="Una colección viva de relatos que llegaron desde diferentes códigos. Filtra por tema y comparte el tuyo desde la sección de lookup."
      >
        <StoriesShowcase stories={communityStories} />
      </Section>
    </main>
  )
}
