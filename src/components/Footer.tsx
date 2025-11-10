import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Aviso de privacidad" },
  { href: "/contact", label: "Contacto" },
  { href: "/partners", label: "Aliados" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/60 bg-black/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 text-sm text-foreground/60 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Manifiesto
          </p>
          <p className="max-w-md text-base text-foreground">
            “Nothing is wasted when everything is done with intention.”
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 text-xs uppercase tracking-[0.3em] text-foreground/60 md:flex-row md:gap-6">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gold">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
          © {new Date().getFullYear()} VIATERRA · Aguascalientes, MX
        </p>
      </div>
    </footer>
  );
}
