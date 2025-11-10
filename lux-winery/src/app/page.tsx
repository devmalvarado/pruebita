import Link from "next/link"
import { Hero } from "@/components/Hero"
import { Section } from "@/components/Section"
import { WineCard } from "@/components/WineCard"
import { StoryLookup } from "@/components/StoryLookup"
import { StoryQuote } from "@/components/StoryQuote"
import { Button } from "@/components/ui/button"
import { communityStories, wines } from "@/lib/data"

const featuredWine = wines[0]
const highlightedStories = communityStories.slice(0, 6)

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero
        title="Every bottle tells a story."
        tagline="Cosecha limitada de rosé de prensa directa que viaja en pares A/B. Una botella es un poema, la otra su respuesta."
        bottleImage={featuredWine.heroImage}
        bottleAlt={featuredWine.name}
        primaryCta={{ label: "Descubrir el vino", href: "/wines" }}
        secondaryCta={{ label: "Leer tu historia A/B", href: "/story" }}
      />

      <Section
        id="filosofia"
        kicker="Nuestra filosofía"
        title="Vinos hechos a mano, historias que se escriben en dúo."
        description="Cada añada limitadísima de Casa Intención se concibe como un puente entre dos botellas complementarias. Cultivamos en altitud, vinificamos con tiempos largos y dejamos que el azar seleccione quién recibe la mitad A o la mitad B."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-sm leading-relaxed text-foreground/70">
            <p>
              Trabajamos con prensado suave, fermentaciones espontáneas y crianza en ánforas
              de arcilla negra. Enviamos cada botella con cartas selladas que guardan la
              narrativa del código asignado.
            </p>
            <p>
              La intención es reunir a dos desconocidos. Cuando las historias se encuentran,
              se completa el manifiesto de esa añada.
            </p>
          </div>
          <div className="rounded-3xl border border-ink/60 bg-ink/40 p-6 text-sm text-foreground/70">
            <p className="font-serif text-xl text-gold">
              “El lujo no es la rareza, es el tiempo que nos permitimos para escuchar al
              vino antes de compartirlo.”
            </p>
            <p className="mt-4 uppercase tracking-[0.3em] text-foreground/50">
              Equipo enológico de Casa Intención
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="vino-destacado"
        kicker="Añada activa"
        title="Canto Circular Rosé 2026"
        description="1400 botellas numeradas, 700 pares. Aguascalientes, viñedo en terrazas volcánicas."
      >
        <WineCard wine={featuredWine} featuredVintage={2026} />
      </Section>

      <Section
        id="lookup"
        kicker="¿Tienes tu código?"
        title="Lee tu historia A/B"
        description="Ingresa el código impreso en el sello de tu botella. Te mostraremos la narrativa completa y cómo contactarnos para compartirla."
        className="bg-ink/40"
      >
        <StoryLookup showShareButton={false} />
        <div className="mt-6 text-right">
          <Button
            asChild
            variant="ghost"
            className="border border-ink px-6 text-xs uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
          >
            <Link href="/story">Ver la experiencia completa</Link>
          </Button>
        </div>
      </Section>

      <Section
        id="preorder"
        kicker="Preventa 2026"
        title="Reserva tu dúo antes de que se agote."
        description="Entrega estimada diciembre 2026. Cada reserva incluye acceso a experiencias digitales y encuentros físicos en la bodega."
      >
        <div className="flex flex-col gap-6 rounded-3xl border border-ink/60 bg-ink/40 p-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-3 text-sm text-foreground/70">
            <p>Selecciona plan Single o Pair A+B según la historia que quieras escribir.</p>
            <p>Los pedidos se asignan en orden de llegada. Confirmamos por correo.</p>
          </div>
          <Button
            asChild
            className="bg-gold px-8 py-6 text-sm uppercase tracking-[0.3em] text-black hover:bg-[#d1b369]"
          >
            <Link href="/preorder">Ir a preventa</Link>
          </Button>
        </div>
      </Section>

      <Section
        id="historias"
        kicker="Comunidad Casa Intención"
        title="Historias que ya se contaron"
        description="Un vistazo a los relatos que han llegado desde diferentes códigos. ¿Listo para compartir el tuyo?"
        variant="muted"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlightedStories.map((story) => (
            <StoryQuote key={story.id} story={story} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="ghost"
            className="border border-ink px-8 py-6 text-sm uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold"
          >
            <Link href="/stories">Explorar más historias</Link>
          </Button>
        </div>
      </Section>
    </main>
  )
}
