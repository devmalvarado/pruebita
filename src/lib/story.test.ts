import { describe, expect, it } from "vitest";
import { findStoryByCode, normalizeStoryCode, parseStoryCode } from "./story";
import { stories } from "./data";

describe("story utilities", () => {
  it("normalizes codes to uppercase without whitespace", () => {
    expect(normalizeStoryCode("  037a ")).toBe("037A");
    expect(normalizeStoryCode("118 b")).toBe("118B");
  });

  it("parses valid codes into prefix and variant", () => {
    expect(parseStoryCode("037A")).toEqual({
      prefix: "037",
      variant: "A",
      normalized: "037A",
    });
    expect(parseStoryCode("501b")).toEqual({
      prefix: "501",
      variant: "B",
      normalized: "501B",
    });
  });

  it("returns null for invalid formats", () => {
    expect(parseStoryCode("37A")).toBeNull();
    expect(parseStoryCode("XYZ1")).toBeNull();
    expect(parseStoryCode("")).toBeNull();
  });

  it("finds stories regardless of variant requested", () => {
    const base = stories[0];
    const storyA = findStoryByCode("037A");
    expect(storyA).toMatchObject({
      code: "037A",
      a: base.a,
      b: base.b,
    });

    const storyB = findStoryByCode("037B");
    expect(storyB).toMatchObject({
      code: "037B",
      a: base.a,
      b: base.b,
    });
  });

  it("returns undefined for unknown codes", () => {
    expect(findStoryByCode("999A")).toBeUndefined();
  });
});
