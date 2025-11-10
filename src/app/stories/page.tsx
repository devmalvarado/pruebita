import type { Metadata } from "next";

import { Section } from "@/components/Section";
import { StoriesExplorer } from "@/components/StoriesExplorer";

export const metadata: Metadata = {
  title: "Historias de la comunidad",
  description:
    "Filtra y descubre relatos de la comunidad VIATERRA alrededor de los códigos A/B. Amor, tiempo, reencuentro, despedidas e inspiración en cada botella.",
};

export default function StoriesPage() {
  return (
    <Section
      eyebrow="Comunidad"
      title="Historias que viajan con cada etiqueta"
      description="Nuestra comunidad comparte fragmentos de momentos guardados entre las botellas A/B. Usa los filtros para explorar relatos por temática."
    >
      <StoriesExplorer />
    </Section>
  );
}
