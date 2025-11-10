import type { Metadata } from "next";

import { Section } from "@/components/Section";
import { StoryLookup } from "@/components/StoryLookup";

export const metadata: Metadata = {
  title: "Consulta tu historia A/B",
  description:
    "Ingresa tu código A/B para descubrir la dupla completa de relatos asociada a tu botella VIATERRA. Comparte tu historia con la comunidad.",
};

export default function StoryPage() {
  return (
    <Section
      eyebrow="Historias A/B"
      title="Cada botella contiene dos versiones del mismo momento"
      description="Introduce el código grabado en el cuello o etiqueta para revelar las historias A y B. Si aún no encuentras la contraparte, deja tu relato y ayúdanos a entrelazar la experiencia."
    >
      <StoryLookup />
    </Section>
  );
}
