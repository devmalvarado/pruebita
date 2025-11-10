"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MenuIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/wines", label: "Vinos" },
  { href: "/stories", label: "Historias" },
  { href: "/story", label: "Tu código A/B" },
  { href: "/preorder", label: "Preventa" },
  { href: "/partners", label: "Aliados" },
  { href: "/contact", label: "Contacto" },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const renderNavLinks = (variant: "desktop" | "mobile") =>
    navItems.map((item) => {
      const isActive =
        item.href === "/"
          ? pathname === "/"
          : pathname.startsWith(item.href) && item.href !== "/"

      const baseClasses =
        "text-sm uppercase tracking-[0.2em] transition-colors duration-200"
      const activeClasses = "text-gold"
      const inactiveClasses =
        "text-foreground/70 hover:text-foreground focus-visible:text-foreground"

      const link = (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            baseClasses,
            isActive ? activeClasses : inactiveClasses,
            variant === "mobile" && "py-3 text-base tracking-[0.3em]",
          )}
          onClick={() => {
            if (variant === "mobile") {
              setOpen(false)
            }
          }}
        >
          {item.label}
        </Link>
      )

      return variant === "desktop" ? (
        <li key={item.href}>{link}</li>
      ) : (
        <div key={item.href}>{link}</div>
      )
    })

  return (
    <header className="sticky top-0 z-50 border-b border-ink/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg tracking-[0.4em] text-gold transition hover:text-gold/90 focus-visible:text-gold"
        >
          CASA INTENCIÓN
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-6">{renderNavLinks("desktop")}</ul>
          <Separator orientation="vertical" className="h-6 bg-ink/60" />
          <LanguageSwitcher />
          <Button asChild variant="default" className="bg-gold text-black hover:bg-[#d1b369]">
            <Link href="/preorder">Reservar</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher size="sm" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
              >
                {open ? (
                  <XIcon className="size-5 text-gold" />
                ) : (
                  <MenuIcon className="size-5 text-gold" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background/90 backdrop-blur-xl sm:max-w-xs"
            >
              <SheetHeader className="text-left font-serif text-gold">
                Navegación
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">{renderNavLinks("mobile")}</div>
              <SheetFooter className="mt-8 flex flex-col gap-4">
                <Button
                  asChild
                  className="w-full bg-gold text-black hover:bg-[#d1b369]"
                >
                  <Link href="/preorder">Preventa limitada</Link>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
