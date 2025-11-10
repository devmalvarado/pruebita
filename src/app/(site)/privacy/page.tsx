import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Círculo Interior",
  description:
    "Conoce cómo resguardamos los datos personales de nuestros clientes y aliados.",
};

export default function PrivacyPage() {
  return (
    <Section
      eyebrow="Legal"
      title="Aviso de privacidad"
      description="Protegemos la información de clientes, aliados y proveedores siguiendo la normativa mexicana vigente."
      className="border-none bg-black/40 py-24"
    >
      <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
        <p>
          Círculo Interior recopila datos personales exclusivamente para
          coordinar preventas, experiencias privadas y contacto comercial.
          Nunca vendemos ni cedemos tu información a terceros sin consentimiento
          escrito.
        </p>
        <p>
          Puedes solicitar acceso, rectificación o eliminación de tus datos
          escribiendo a{" "}
          <a href="mailto:privacy@circulointerior.mx" className="text-gold">
            privacy@circulointerior.mx
          </a>
          . Responderemos en un plazo máximo de 10 días hábiles.
        </p>
        <p>
          Actualizamos este aviso conforme evoluciona nuestra operación y lo
          comunicamos por correo a los suscriptores activos.
        </p>
      </div>
    </Section>
  );
}
