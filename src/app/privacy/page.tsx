import type { Metadata } from "next";

import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Conoce cómo VIATERRA protege los datos personales recabados durante preventas, contacto y participación en la comunidad.",
};

export default function PrivacyPage() {
  return (
    <Section
      eyebrow="Privacidad"
      title="Cuidamos tu información con el mismo rigor que cuidamos cada añada"
      description="Este aviso describe cómo recopilamos, utilizamos y protegemos tus datos cuando interactúas con VIATERRA."
    >
      <div className="space-y-6 text-sm text-foreground/70">
        <p>
          Los datos recabados a través de formularios de contacto, preventa,
          partners y newsletter sólo se utilizan para fines operativos de
          VIATERRA. Nunca vendemos ni compartimos tu información con terceros sin
          tu autorización explícita.
        </p>
        <p>
          Puedes solicitar la actualización o eliminación de tus datos escribiendo
          a <a href="mailto:hola@viaterra.mx" className="text-gold">hola@viaterra.mx</a>. Atendemos todas las solicitudes en un plazo máximo de 10 días hábiles.
        </p>
        <p>
          Este aviso puede actualizarse cuando lancemos nuevos servicios. Las
          versiones actualizadas estarán siempre disponibles en este sitio.
        </p>
      </div>
    </Section>
  );
}
