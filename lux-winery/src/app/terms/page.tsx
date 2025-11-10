import type { Metadata } from "next"
import { Section } from "@/components/Section"

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de uso del sitio y reservas de preventa Casa Intención.",
}

export default function TermsPage() {
  return (
    <main className="flex flex-col">
      <Section
        kicker="Condiciones"
        title="Términos y condiciones"
        description="El acceso a nuestro sitio implica la aceptación de estas condiciones. Ajustaremos los términos conforme evolucione el proyecto."
      >
        <div className="space-y-4 text-sm text-foreground/70">
          <p>
            Las preventas requieren un pago anticipado del 50% y el balance al confirmar la
            fecha de entrega. Casa Intención puede reprogramar entregas por causas de fuerza
            mayor, notificando con mínimo 30 días de anticipación.
          </p>
          <p>
            El contenido de este sitio (textos, imágenes, historias A/B) está protegido por
            derechos de autor. Puedes compartir fragmentos citando la fuente, pero cualquier
            uso comercial requiere autorización por escrito.
          </p>
          <p>
            Los visitantes deben tener edad legal para consumir alcohol en su país. Al
            interactuar con nuestras preventas confirmas que cumples con este requisito.
          </p>
        </div>
      </Section>
    </main>
  )
}
