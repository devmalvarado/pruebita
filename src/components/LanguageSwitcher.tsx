"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

type LanguageSwitcherProps = {
  variant?: "default" | "icon";
};

export function LanguageSwitcher({ variant = "default" }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);

  const triggerClass = cn(
    "flex items-center gap-2 rounded-full border border-ink/60 bg-black/50 text-xs uppercase tracking-[0.2em] text-white transition hover:border-gold hover:text-gold",
    variant === "icon"
      ? "h-10 w-10 justify-center border-none bg-transparent text-white hover:bg-black/40"
      : "px-3 py-2"
  );

  const triggerContent =
    variant === "icon" ? <Globe className="h-4 w-4" /> : <span>ES / EN</span>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className={triggerClass} aria-label="Cambiar idioma">
          {triggerContent}
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-ink bg-black text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif text-gold">
            Cambios de idioma
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-300">
            El sitio está disponible en español. Pronto activaremos la versión en
            inglés. ¿Quieres recibir noticias? Escríbenos en la página de
            contacto.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
