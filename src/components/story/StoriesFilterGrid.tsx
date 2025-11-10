"use client";

import { useMemo, useState } from "react";
import { storyFilters, communityQuotes } from "@/lib/data";
import { StoryQuote } from "@/components/StoryQuote";
import { Button } from "@/components/ui/button";
import { StorySubmitDialog } from "./StorySubmitDialog";

export function StoriesFilterGrid() {
  const [filter, setFilter] = useState<(typeof storyFilters)[number]["value"]>("All");

  const filteredQuotes = useMemo(() => {
    if (filter === "All") {
      return communityQuotes;
    }
    return communityQuotes.filter((quote) => quote.theme === filter);
  }, [filter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {storyFilters.map((item) => (
          <Button
            key={item.value}
            variant={filter === item.value ? "default" : "outline"}
            className={
              filter === item.value
                ? "rounded-full bg-gold px-4 py-2 text-black hover:bg-[#d1b369]"
                : "rounded-full border-gold px-4 py-2 text-gold hover:bg-ink"
            }
            onClick={() => setFilter(item.value)}
            aria-pressed={filter === item.value}
          >
            {item.label}
          </Button>
        ))}
        <div className="ml-auto">
          <StorySubmitDialog />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuotes.map((quote) => (
          <StoryQuote key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
}
