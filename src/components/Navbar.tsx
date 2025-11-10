"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/wines", label: "Vinos" },
  { href: "/story", label: "Historia A/B" },
  { href: "/preorder", label: "Preventa" },
  { href: "/stories", label: "Comunidad" },
  { href: "/partners", label: "Aliados" },
  { href: "/contact", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2 text-sm">
          <span className="rounded-full border border-gold/30 px-3 py-1 font-serif text-sm tracking-[0.4em] text-gold transition group-hover:bg-gold group-hover:text-background">
            VIA
          </span>
          <span className="font-serif text-lg uppercase tracking-[0.3em] text-foreground/80 group-hover:text-gold">
            TERRA
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm uppercase tracking-[0.25em] text-foreground/65 transition hover:text-gold",
                  isActive && "text-gold",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <LanguageSwitcher />
          <Button asChild variant="outline" className="border-gold/60 text-gold">
            <Link href="/preorder">Preordenar</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border border-ink/80 bg-ink/60 text-foreground"
                aria-label="Abrir menú de navegación"
              >
                <span className="sr-only">Abrir menú</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background/95">
              <SheetHeader>
                <SheetTitle className="font-serif tracking-[0.4em] text-gold">
                  VIATERRA
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-5 text-sm uppercase tracking-[0.35em]">
                {links.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "border-b border-ink/60 pb-3 text-foreground/70 transition hover:text-gold",
                        isActive && "text-gold",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Button
                  asChild
                  className="mt-3 w-full bg-gold text-background hover:bg-gold/90"
                >
                  <Link href="/preorder">Preordenar</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
