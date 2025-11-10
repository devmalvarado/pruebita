"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { communityStories } from "@/lib/data";
import type { StoryTheme } from "@/lib/types";
import { StoryQuote } from "./StoryQuote";

const themes: Array<StoryTheme | "Todos"> = [
  "Todos",
  "Love",
  "Time",
  "Reunion",
  "Farewell",
  "Inspiration",
];

const PAGE_SIZE = 6;

export function StoriesExplorer() {
  const [activeTheme, setActiveTheme] = useState<(typeof themes)[number]>("Todos");
  const [page, setPage] = useState(0);

  const filteredStories = useMemo(() => {
    if (activeTheme === "Todos") return communityStories;
    return communityStories.filter((story) => story.theme === activeTheme);
  }, [activeTheme]);

  const paginatedStories = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filteredStories.slice(start, start + PAGE_SIZE);
  }, [filteredStories, page]);

  const totalPages = Math.ceil(filteredStories.length / PAGE_SIZE);

  const handleThemeChange = (theme: (typeof themes)[number]) => {
    setActiveTheme(theme);
    setPage(0);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {themes.map((theme) => (
          <Button
            key={theme}
            type="button"
            variant={activeTheme === theme ? "default" : "outline"}
            className={
              activeTheme === theme
                ? "bg-gold text-background hover:bg-gold/90"
                : "border-gold/40 text-gold hover:bg-gold/10"
            }
            onClick={() => handleThemeChange(theme)}
          >
            {theme}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {paginatedStories.map((story) => (
          <StoryQuote key={story.id} story={story} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-xl border border-ink/60 bg-black/40 p-4 text-sm text-foreground/70">
          <span>
            Página {page + 1} de {totalPages}
          </span>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold/10"
              onClick={() => setPage((current) => Math.max(current - 1, 0))}
              disabled={page === 0}
            >
              Anterior
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold/10"
              onClick={() =>
                setPage((current) => Math.min(current + 1, totalPages - 1))
              }
              disabled={page + 1 >= totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
