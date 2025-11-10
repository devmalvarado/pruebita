import type { Metadata } from "next";

import { PartnersForm } from "@/components/PartnersForm";
import { Section } from "@/components/Section";
import { partnerLocations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Red de aliados",
  description:
    "Restaurantes, hoteles y enotecas que ya sirven VIATERRA. Completa el formulario para convertirte en aliado oficial.",
};

export default function PartnersPage() {
  return (
    <Section
      eyebrow="Aliados"
      title="Donde encontrar VIATERRA"
      description="Estos son algunos de los espacios que ya apuestan por la edición limitada VIATERRA. Si deseas sumarte, llena el formulario y te escribiremos con la guía de colaboración."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6 rounded-2xl border border-ink/60 bg-black/40 p-6">
          <ul className="space-y-4 text-sm text-foreground/70">
            {partnerLocations.map((partner) => (
              <li
                key={partner.name}
                className="flex flex-col gap-1 rounded border border-ink/60 bg-ink/60 p-4"
              >
                <span className="text-xs uppercase tracking-[0.35em] text-gold/80">
                  {partner.type}
                </span>
                <p className="font-semibold text-foreground">{partner.name}</p>
                <p>{partner.city}</p>
                {partner.url && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.3em] text-gold hover:text-gold/80"
                  >
                    Visitar sitio
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-foreground/60">
            Estamos preparando un mapa interactivo para nuevas aperturas y
            catas pop-up en ciudades clave.
          </p>
        </div>
        <div>
          <PartnersForm />
        </div>
      </div>
    </Section>
  );
}
