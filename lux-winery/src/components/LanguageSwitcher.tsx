"use client"

import { GlobeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type LanguageSwitcherProps = {
  size?: "sm" | "md"
}

export const LanguageSwitcher = ({ size = "md" }: LanguageSwitcherProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size={size === "sm" ? "icon" : "default"}
      disabled
      className={cn(
        "border border-ink/60 text-foreground/70 transition hover:border-gold/60 hover:text-gold",
        "disabled:cursor-not-allowed disabled:opacity-70",
        size === "sm" && "size-9 rounded-full",
      )}
      aria-label="Selector de idioma (próximamente)"
    >
      <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
        <GlobeIcon className="size-4 text-gold" />
        {size === "sm" ? "ES" : "ES · EN"}
      </span>
    </Button>
  )
}
