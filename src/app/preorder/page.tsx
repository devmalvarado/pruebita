import type { Metadata } from "next";

import { PreorderForm } from "@/components/PreorderForm";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Preventa exclusiva VIATERRA",
  description:
    "Asegura tu botella o la pareja A/B de Círculo Rosé de Prensa 2026. Edición limitada a 700 pares, entrega estimada diciembre 2026.",
};

export default function PreorderPage() {
  return (
    <Section
      eyebrow="Preventa"
      title="Antes de descorchar, cuenta la historia"
      description="Selecciona el plan que se alinee a tu ritual y déjanos tus datos para personalizar la entrega. Cada preventa incluye acceso anticipado a experiencias privadas y contenidos editoriales."
    >
      <PreorderForm />
    </Section>
  );
}
