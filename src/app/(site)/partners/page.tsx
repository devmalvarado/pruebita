import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { partnerLocations } from "@/lib/data";
import { PartnerForm } from "@/components/partners/PartnerForm";

export const metadata: Metadata = {
  title: "Dónde encontrarnos | Círculo Interior",
  description:
    "Restaurantes, hoteles y enotecas que sirven Círculo Interior. Solicita una alianza para distribuir nuestras ediciones limitadas.",
};

export default function PartnersPage() {
  return (
    <Section
      eyebrow="Aliados"
      title="Espacios que cuentan historias con nosotros"
      description="Seleccionamos puntos de venta que celebran experiencias gastronómicas inmersivas. Si deseas sumarte, completa el formulario."
      className="border-none bg-black/40 py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          {partnerLocations.map((partner) => (
            <Card
              key={partner.name}
              className="border border-ink/60 bg-black/60 text-white"
            >
              <CardHeader>
                <CardTitle className="text-xl font-serif text-gold">
                  {partner.name}
                </CardTitle>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {partner.type} · {partner.city}, {partner.region}
                </p>
              </CardHeader>
              <CardContent className="text-sm text-zinc-300">
                {partner.highlight}
              </CardContent>
            </Card>
          ))}
        </div>
        <PartnerForm />
      </div>
    </Section>
  );
}
