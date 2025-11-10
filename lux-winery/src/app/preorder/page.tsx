import type { Metadata } from "next"
import { Section } from "@/components/Section"
import { PreorderForm } from "@/components/PreorderForm"

export const metadata: Metadata = {
  title: "Preventa limitada",
  description:
    "Reserva tu botella A o tu dúo A+B del Canto Circular Rosé 2026. Cupos limitados con entrega estimada en diciembre 2026.",
}

export default function PreorderPage() {
  return (
    <main className="flex flex-col">
      <Section
        kicker="Preventa 2026"
        title="Aparta tu historia embotellada"
        description="Elige el plan Single o Pair A+B. Confirmaremos tu pedido por correo y te enviaremos las instrucciones para completar el pago seguro."
      >
        <PreorderForm />
      </Section>
    </main>
  )
}
