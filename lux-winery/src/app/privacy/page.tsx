import type { Metadata } from "next"
import { Section } from "@/components/Section"

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Política de privacidad de Casa Intención sobre el uso de datos personales de clientes y partners.",
}

export default function PrivacyPage() {
  return (
    <main className="flex flex-col">
      <Section
        kicker="Transparencia"
        title="Aviso de privacidad"
        description="Cuidamos la información de nuestros clientes y aliados con protocolos internos. Esta política se actualizará conforme crecemos."
      >
        <div className="space-y-4 text-sm text-foreground/70">
          <p>
            Casa Intención recaba datos personales estrictamente para gestionar preventas,
            eventos privados y comunicaciones sobre lanzamientos. Al compartir tu información
            nos autorizas a contactarte por correo electrónico o teléfono con fines
            relacionados a la marca.
          </p>
          <p>
            No vendemos ni transferimos tus datos a terceros. En caso de colaborar con
            proveedores (logística, pagos, experiencias), firmamos acuerdos de
            confidencialidad y compartimos solo la información indispensable para ejecutar el
            servicio.
          </p>
          <p>
            Puedes solicitar acceso, rectificación o cancelación de tus datos escribiendo a{" "}
            <a href="mailto:privacy@casa-intencion.com" className="text-gold underline">
              privacy@casa-intencion.com
            </a>
            . Respondemos en un plazo máximo de 10 días hábiles.
          </p>
        </div>
      </Section>
    </main>
  )
}
