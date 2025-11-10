"use client"

import { useMemo, useState } from "react"
import { storyThemes, communityStories } from "@/lib/data"
import type { CommunityStory, StoryTheme } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { StoryQuote } from "@/components/StoryQuote"
import { cn } from "@/lib/utils"

type StoriesShowcaseProps = {
  stories?: CommunityStory[]
}

const ALL = "All"
const PAGE_SIZE = 6

export const StoriesShowcase = ({
  stories = communityStories,
}: StoriesShowcaseProps) => {
  const [selectedTheme, setSelectedTheme] = useState<typeof ALL | StoryTheme>(ALL)
  const [page, setPage] = useState(1)

  const filteredStories = useMemo(() => {
    if (selectedTheme === ALL) {
      return stories
    }
    return stories.filter((story) => story.theme === selectedTheme)
  }, [stories, selectedTheme])

  const totalPages = Math.max(1, Math.ceil(filteredStories.length / PAGE_SIZE))
  const currentStories = filteredStories.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {[ALL, ...storyThemes].map((theme) => (
          <Button
            key={theme}
            variant="ghost"
            onClick={() => {
              setSelectedTheme(theme as typeof ALL | StoryTheme)
              setPage(1)
            }}
            className={cn(
              "border border-ink px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold",
              selectedTheme === theme && "border-gold bg-gold/10 text-gold",
            )}
          >
            {theme}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentStories.map((story) => (
          <StoryQuote key={story.id} story={story} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-ink/60 pt-6 text-xs uppercase tracking-[0.3em] text-foreground/60">
        <span>
          Página {page} de {totalPages}
        </span>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="border border-ink px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold disabled:opacity-40"
          >
            Anterior
          </Button>
          <Button
            variant="ghost"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="border border-ink px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold disabled:opacity-40"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
