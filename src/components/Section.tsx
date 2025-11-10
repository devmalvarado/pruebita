import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title?: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
};

export function Section({
  id,
  title,
  eyebrow,
  description,
  className,
  as: Tag = "section",
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "w-full border-t border-ink/50 bg-black/30 py-16 sm:py-20",
        className
      )}
    >
      <div className="container flex flex-col gap-10">
        {(title || eyebrow || description) && (
          <header className="max-w-3xl space-y-4">
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-serif sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="text-base text-zinc-300 sm:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}
