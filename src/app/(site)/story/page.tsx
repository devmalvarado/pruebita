import type { Metadata } from "next";
import { StoryLookup } from "@/components/StoryLookup";
import { Section } from "@/components/Section";
import { StorySubmitDialog } from "@/components/story/StorySubmitDialog";
import { storyFilters } from "@/lib/data";

export const metadata: Metadata = {
  title: "A/B Story Lookup | Círculo Interior",
  description:
    "Consulta el código A/B de tu botella y comparte la historia que descubriste con la comunidad.",
};

export default function StoryPage() {
  return (
    <Section
      eyebrow="A/B Story"
      title="Tu código es la puerta de entrada"
      description="Ingresa tu código de cuatro caracteres (tres dígitos + letra) para desbloquear las historias de tu botella. Si aún no tienes la contraparte, puedes compartirla desde aquí."
      className="border-none bg-black/40 py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <StoryLookup className="max-w-3xl" />
        <div className="space-y-6 rounded-3xl border border-ink/60 bg-black/60 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Temas recurrentes
          </p>
          <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-zinc-400">
            {storyFilters
              .filter((filter) => filter.value !== "All")
              .map((filter) => (
                <li key={filter.value} className="rounded-full border border-ink px-3 py-1">
                  {filter.label}
                </li>
              ))}
          </ul>
          <p className="text-sm text-zinc-300">
            Cada historia se revisa manualmente antes de publicarse. Compartimos
            fragmentos en la sección de comunidad y en experiencias físicas con
            aliados gastronómicos.
          </p>
          <StorySubmitDialog />
        </div>
      </div>
    </Section>
  );
}
