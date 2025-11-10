import { stories, storySubmissions } from "./data";
import type { ABStory, StorySubmission } from "./types";

const CODE_PATTERN = /^(\d{3})([AB])$/i;

export function normalizeStoryCode(input: string): string {
  return input.replace(/\s+/g, "").toUpperCase();
}

export function parseStoryCode(code: string) {
  const normalized = normalizeStoryCode(code);
  const match = normalized.match(CODE_PATTERN);

  if (!match) {
    return null;
  }

  const [, prefix, variant] = match;
  return { prefix, variant: variant as "A" | "B", normalized };
}

export function findStoryByCode(code: string): ABStory | undefined {
  const parsed = parseStoryCode(code);
  if (!parsed) return undefined;

  const baseCode = `${parsed.prefix}A`;
  const story = stories.find((item) => item.code === baseCode);
  if (!story) return undefined;

  return {
    ...story,
    code: parsed.normalized,
  };
}

export function addStorySubmission(submission: StorySubmission) {
  storySubmissions.push(submission);
}

export function listStorySubmissions() {
  return storySubmissions;
}
