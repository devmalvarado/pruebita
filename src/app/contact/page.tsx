import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hablemos sobre experiencias privadas, cobertura editorial y alianzas con VIATERRA. También puedes unirte a la lista de espera para nuevas añadas.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contacto"
      title="Cuidamos cada conversación como cuidamos la vendimia"
      description="Resolvemos dudas sobre preventas, experiencias privadas, prensa y colaboraciones. Si solo quieres recibir noticias, deja tu correo en la newsletter."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <ContactForm />
        <div className="space-y-6 rounded-2xl border border-ink/60 bg-black/40 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              Oficina VIATERRA
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              Aguascalientes · Envíos a todo México y experiencias pop-up en
              CDMX, Guadalajara y Monterrey.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              Newsletter
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              Regístrate para enterarte de nuevas añadas, códigos especiales y
              catas privadas.
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </div>
    </Section>
  );
}
