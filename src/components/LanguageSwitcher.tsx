"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

const locales = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const [active, setActive] = useState("es");

  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
      {locales.map((locale) => (
        <Button
          key={locale.code}
          variant={locale.code === active ? "default" : "ghost"}
          size="sm"
          className={
            locale.code === active
              ? "bg-gold/90 text-background hover:bg-gold"
              : "text-foreground/60 hover:text-gold"
          }
          onClick={() => {
            setActive(locale.code);
          }}
          aria-label={`Cambiar a ${locale.label}`}
        >
          {locale.label}
        </Button>
      ))}
      <span className="sr-only">
        Conmutador de idioma listo para integrar next-intl.
      </span>
    </div>
  );
}
