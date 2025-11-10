import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { StoriesFilterGrid } from "@/components/story/StoriesFilterGrid";

export const metadata: Metadata = {
  title: "Historias compartidas | Círculo Interior",
  description:
    "Explora historias enviadas por la comunidad de Círculo Interior. Filtra por temas y comparte la tuya.",
};

export default function StoriesPage() {
  return (
    <Section
      eyebrow="Comunidad"
      title="Historias que circulan"
      description="Cada cita proviene de un código compartido por clientes y aliados. Usa los filtros para explorar por tema."
      className="border-none bg-black/40 py-24"
    >
      <StoriesFilterGrid />
    </Section>
  );
}
