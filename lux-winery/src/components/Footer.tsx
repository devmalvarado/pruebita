import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  { href: "/story", label: "Busca tu historia" },
  { href: "/preorder", label: "Reserva tu dúo" },
  { href: "/partners", label: "Aliados" },
  { href: "/contact", label: "Contacto" },
]

export const Footer = () => {
  return (
    <footer className="border-t border-ink/60 bg-background/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div>
            <p className="font-serif text-lg text-gold">
              Nothing is wasted when everything is done with intention.
            </p>
            <p className="mt-3 max-w-xl text-sm text-foreground/70">
              Casa Intención es un proyecto vinícola independiente enclavado en el
              altiplano hidrocálido. Vinos que narran historias en pares para celebrar
              uniones improbables.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.25em] text-foreground/60">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-gold focus-visible:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-ink/50" />

        <div className="flex flex-col gap-4 text-xs text-foreground/60 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Casa Intención. Todos los derechos reservados.</span>
          <div className="flex gap-4 uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-gold focus-visible:text-gold">
              Aviso de privacidad
            </Link>
            <Link href="/terms" className="hover:text-gold focus-visible:text-gold">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
