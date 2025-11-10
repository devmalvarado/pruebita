import { abStories, wines } from "./data";
import type { ABStory, Wine } from "./types";

export const normalizeStoryCode = (code: string) =>
  code.replace(/\s+/g, "").toUpperCase();

export const getStoryByCode = (code: string): ABStory | null => {
  if (!code) return null;
  const normalized = normalizeStoryCode(code);
  if (normalized.length < 3) return null;

  const baseCode = normalized.endsWith("B")
    ? `${normalized.slice(0, -1)}A`
    : normalized;

  const story = abStories.find(
    (item) => normalizeStoryCode(item.code) === baseCode,
  );

  if (!story) {
    return null;
  }

  return {
    ...story,
    code: normalized,
  };
};

export const getWineBySlug = (slug: string): Wine | undefined =>
  wines.find((wine) => wine.slug === slug);

export const getVintageFromWine = (wine: Wine, vintage: number) =>
  wine.vintages.find((item) => item.year === vintage);
