import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { partners } from "@/lib/data"
import { PartnerInquiryForm } from "@/components/PartnerInquiryForm"

export const metadata: Metadata = {
  title: "Aliados y puntos de encuentro",
  description:
    "Descubre restaurantes, hoteles y enotecas que forman parte de la red Casa Intención. Solicita convertirte en partner.",
}

export default function PartnersPage() {
  return (
    <main className="flex flex-col">
      <Section
        kicker="Dónde encontrarnos"
        title="Partners que nos inspiran"
        description="Una selección de espacios que comparten nuestra manera de entender el lujo: sin prisa y con intención."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="border border-ink/60 bg-ink/40 transition hover:border-gold/60"
            >
              <CardHeader className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">{partner.type}</p>
                <h3 className="font-serif text-2xl tracking-[0.08em] text-foreground">
                  {partner.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  {partner.city}, {partner.region}
                </p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-foreground/70">
                <p>{partner.highlight}</p>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-xs uppercase tracking-[0.3em] text-gold hover:text-gold/80"
                  >
                    Visitar sitio →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        kicker="Sé parte"
        title="Conviértete en partner"
        description="Recibimos pocas alianzas al año. Cuéntanos tu concepto y te contactaremos con una propuesta personalizada."
        variant="muted"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <PartnerInquiryForm />
          <div className="rounded-3xl border border-ink/60 bg-ink/30 p-6 text-sm text-foreground/70">
            <p className="font-serif text-xl text-gold">
              “Trabajar con Casa Intención significa crear experiencias líquidas que cuentan
              un relato compartido con nuestros comensales.”
            </p>
            <p className="mt-4 uppercase tracking-[0.3em] text-foreground/50">
              Mariana C., Head Sommelier · Horizonte CDMX
            </p>
            <p className="mt-6 text-xs text-foreground/60">
              Organizamos catas privadas, residencias gastronómicas y colaboraciones
              editoriales para partners seleccionados.
            </p>
          </div>
        </div>
      </Section>
    </main>
  )
}
