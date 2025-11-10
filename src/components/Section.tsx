import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
  withDivider?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
  withDivider = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 sm:py-20 md:py-24",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-3xl",
          align === "center" && "text-center",
          align === "left" && "md:max-w-none",
        )}
      >
        {(eyebrow || title || description) && (
          <header className={cn("space-y-4", align === "left" && "md:w-3/4")}>
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.35em] text-gold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="text-base text-foreground/70 sm:text-lg">
                {description}
              </p>
            )}
            {withDivider && (
              <Separator className="mx-auto w-24 border-gold/40" />
            )}
          </header>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
