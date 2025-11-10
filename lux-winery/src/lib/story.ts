import { NextResponse } from "next/server"
import { abStories, wines } from "@/lib/data"
import type { ABStory } from "@/lib/types"

export type StoryLookupResult = {
  story: ABStory
  requestedCode: string
  variant: "A" | "B"
}

export const normalizeStoryCode = (code: string) =>
  code.replace(/[^a-z0-9]/gi, "").toUpperCase()

export const coerceToPrimaryCode = (code: string) => {
  const normalized = normalizeStoryCode(code)
  if (!normalized) {
    return { primaryCode: "", variant: "A" as const }
  }

  const variant = normalized.endsWith("B") ? ("B" as const) : ("A" as const)
  const primaryCode =
    variant === "B"
      ? normalized.slice(0, Math.max(0, normalized.length - 1)) + "A"
      : normalized

  return { primaryCode, variant }
}

export const findStoryByCode = (code: string): StoryLookupResult | null => {
  const { primaryCode, variant } = coerceToPrimaryCode(code)
  if (!primaryCode) {
    return null
  }

  const story = abStories.find((entry) => entry.code === primaryCode)
  if (!story) {
    return null
  }

  return {
    story,
    variant,
    requestedCode: normalizeStoryCode(code),
  }
}

export const getWineForStory = (story: ABStory) =>
  wines.find((wine) => wine.slug === story.wineSlug) ?? null

/**
 * Helper used by API routes to build consistent JSON responses.
 */
export const buildStoryResponse = (code: string) => {
  const result = findStoryByCode(code)

  if (!result) {
    return NextResponse.json(
      { error: "Story code not found" },
      {
        status: 404,
      },
    )
  }

  const { story, variant, requestedCode } = result
  const wine = getWineForStory(story)

  return NextResponse.json(
    {
      ...story,
      requestedCode,
      variant,
      wine: wine
        ? {
            name: wine.name,
            slug: wine.slug,
            vintage: story.vintage,
            heroImage: wine.heroImage,
          }
        : null,
    },
    { status: 200 },
  )
}
