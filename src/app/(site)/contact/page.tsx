import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { NewsletterForm } from "@/components/contact/NewsletterForm";

export const metadata: Metadata = {
  title: "Contacto | Círculo Interior",
  description:
    "Escríbenos para colaboraciones, experiencias y prensa. Suscríbete para recibir noticias sobre nuestras ediciones limitadas.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contacto"
      title="Hablemos de experiencias con intención"
      description="Nuestro equipo responde personalmente cada mensaje. También puedes suscribirte para enterarte primero de las nuevas añadas."
      className="border-none bg-black/40 py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />
        <div className="space-y-6 rounded-3xl border border-ink/60 bg-black/60 p-6">
          <h3 className="text-lg font-serif text-gold">Newsletter</h3>
          <p className="text-sm text-zinc-300">
            Recibe invitaciones a catas privadas, preventas y nuevas historias
            A/B directamente en tu correo.
          </p>
          <NewsletterForm />
          <div className="space-y-2 text-xs text-zinc-500">
            <p>También nos encuentras en:</p>
            <ul className="space-y-1">
              <li>· Instagram @circulointerior.winery</li>
              <li>· WhatsApp +52 1 449 000 0000</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
