import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

type SectionProps = {
  id?: string
  title?: string
  kicker?: string
  description?: string
  children: ReactNode
  className?: string
  variant?: "default" | "muted"
}

export const Section = ({
  id,
  title,
  kicker,
  description,
  children,
  className,
  variant = "default",
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20",
        variant === "muted" && "bg-ink/40",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {(title || kicker || description) && (
          <header className="max-w-3xl space-y-4">
            {kicker && (
              <p className="text-xs uppercase tracking-[0.4em] text-gold">
                {kicker}
              </p>
            )}
            {title && (
              <div>
                <h2 className="font-serif text-3xl tracking-[0.1em] text-foreground sm:text-4xl">
                  {title}
                </h2>
                <Separator className="mt-4 w-12 bg-gold" />
              </div>
            )}
            {description && (
              <p className="text-sm text-foreground/70 sm:text-base">{description}</p>
            )}
          </header>
        )}
        <div className={cn("mt-10", !title && "mt-0")}>{children}</div>
      </div>
    </section>
  )
}
