"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
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

const navLinks = [
  { href: "/wines", label: "Vinos" },
  { href: "/story", label: "A/B Story" },
  { href: "/preorder", label: "Preventa" },
  { href: "/stories", label: "Historias" },
  { href: "/partners", label: "Aliados" },
  { href: "/contact", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname.startsWith(href) || pathname === `${href}/`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/40 bg-black/80 backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-serif text-lg text-gold md:text-xl">
          Círculo Interior
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest text-zinc-100 transition hover:text-gold",
                isActive(link.href) && "text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button asChild className="rounded-full bg-gold px-5 py-1.5 text-sm font-semibold text-black hover:bg-[#d1b369]">
            <Link href="/preorder">Reservar</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher variant="icon" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-10 rounded-full border border-ink/60 bg-black/40 text-white hover:bg-ink"
                aria-label="Abrir navegación"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black text-white">
              <SheetHeader>
                <SheetTitle className="font-serif text-gold">
                  Círculo Interior
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4 text-lg">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "uppercase tracking-widest transition hover:text-gold",
                      isActive(link.href) && "text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Button
                asChild
                className="mt-8 w-full rounded-full bg-gold text-black hover:bg-[#d1b369]"
              >
                <Link href="/preorder" onClick={() => setOpen(false)}>
                  Reservar tu botella
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
