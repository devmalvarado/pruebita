import Link from "next/link";
import { siteMetadata } from "@/lib/seo";

const footerLinks = [
  { href: "/wines", label: "Vinos" },
  { href: "/story", label: "A/B Story" },
  { href: "/preorder", label: "Preventa" },
  { href: "/stories", label: "Historias" },
  { href: "/partners", label: "Aliados" },
  { href: "/contact", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/60 bg-black/80 py-12 text-zinc-400">
      <div className="container grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {siteMetadata.siteName}
          </p>
          <p className="max-w-md text-lg font-serif text-white">
            Nothing is wasted when everything is done with intention.
          </p>
          <p className="max-w-2xl text-sm text-zinc-500">
            Ediciones limitadas elaboradas en Aguascalientes. Seleccionamos uvas
            de altitud para crear rosés con alma mexicana y espíritu global.
          </p>
        </div>
        <div className="space-y-4 md:justify-self-end">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Navegación
          </p>
          <ul className="grid gap-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-gold focus-visible:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mt-10 flex flex-col gap-2 border-t border-ink/60 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {siteMetadata.siteName}. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:text-gold">
            Contáctanos
          </Link>
          <Link href="/privacy" className="hover:text-gold">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
