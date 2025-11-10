import type { Metadata } from "next";
import { PreorderPlans } from "@/components/PreorderPlans";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Preventa Prensa Rosé 2026 | Círculo Interior",
  description:
    "Asegura tus botellas edición limitada Prensa Rosé 2026. Elige entre plan individual o par A/B.",
};

export default function PreorderPage() {
  return (
    <Section
      eyebrow="Preventa"
      title="Resguarda tu edición limitada"
      description="Selecciona tu plan, comparte tus datos y te contactaremos para cerrar la preventa. Entrega estimada: diciembre 2026. Limitado a 700 pares A + 700 B."
      className="border-none bg-black/40 py-24"
    >
      <PreorderPlans />
    </Section>
  );
}
