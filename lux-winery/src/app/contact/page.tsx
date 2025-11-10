import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { ContactForm } from "@/components/ContactForm"
import { NewsletterSignup } from "@/components/NewsletterSignup"

export const metadata: Metadata = {
  title: "Contacto Casa Intención",
  description:
    "Habla con nuestro equipo para experiencias privadas, colaboraciones o prensa. Suscríbete al boletín íntimo.",
}

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <Section
        kicker="Contacto"
        title="Estamos listos para escuchar tu historia"
        description="Escríbenos para colaboraciones, experiencias privadas, prensa o ventas directas a hospitality."
      >
        <div className="grid gap-8 lg:grid-cols-[1.3fr,1fr]">
          <ContactForm />
          <div className="space-y-6 rounded-3xl border border-ink/60 bg-ink/30 p-6 text-sm text-foreground/70">
            <div>
              <p className="font-serif text-xl text-gold">Boletín íntimo</p>
              <p className="mt-2">
                Noticias sobre lanzamientos, cenas secretas y residencias artísticas (sin
                spam, máximo un correo al mes).
              </p>
            </div>
            <NewsletterSignup />
            <div className="rounded-2xl border border-ink/40 bg-ink/40 p-4 text-xs uppercase tracking-[0.3em] text-foreground/60">
              <p>Prensa: media@casa-intencion.com</p>
              <p className="mt-2">Hospitality: partners@casa-intencion.com</p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
