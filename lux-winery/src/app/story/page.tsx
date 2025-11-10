import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { StoryLookup } from "@/components/StoryLookup"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Lookup código A/B",
  description:
    "Ingresa tu código A/B para leer la narrativa completa y compartirla con la comunidad Casa Intención.",
}

export default function StoryLookupPage() {
  return (
    <main className="flex flex-col">
      <Section
        kicker="Código A/B"
        title="Lee, comparte y completa tu historia"
        description="Escribe el código impreso en el sello de tu botella. Obtendrás la versión A y B del relato, recomendaciones y un canal directo para compartir lo que viviste."
      >
        <StoryLookup showShareButton />
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="ghost"
            className="border border-ink px-8 py-6 text-sm uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
          >
            <Link href="/stories">Explorar historias de la comunidad</Link>
          </Button>
        </div>
      </Section>
    </main>
  )
}
