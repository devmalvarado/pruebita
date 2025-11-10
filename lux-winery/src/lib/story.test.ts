import { describe, expect, it } from "vitest"
import {
  coerceToPrimaryCode,
  findStoryByCode,
  normalizeStoryCode,
} from "@/lib/story"

describe("normalizeStoryCode", () => {
  it("uppercases and strips invalid characters", () => {
    expect(normalizeStoryCode(" 037a ")).toBe("037A")
    expect(normalizeStoryCode("11-8b")).toBe("118B")
    expect(normalizeStoryCode("!501b?")).toBe("501B")
  })
})

describe("coerceToPrimaryCode", () => {
  it("returns the same code when variant is A", () => {
    expect(coerceToPrimaryCode("037A")).toEqual({
      primaryCode: "037A",
      variant: "A",
    })
  })

  it("normalizes B variant to its paired A code", () => {
    expect(coerceToPrimaryCode("037B")).toEqual({
      primaryCode: "037A",
      variant: "B",
    })
  })

  it("handles lowercase and whitespace", () => {
    expect(coerceToPrimaryCode(" 118b ")).toEqual({
      primaryCode: "118A",
      variant: "B",
    })
  })

  it("returns empty primary code when input is invalid", () => {
    expect(coerceToPrimaryCode("")).toEqual({
      primaryCode: "",
      variant: "A",
    })
  })
})

describe("findStoryByCode", () => {
  it("returns a story when the code exists", () => {
    const result = findStoryByCode("037A")
    expect(result?.story.code).toBe("037A")
    expect(result?.variant).toBe("A")
  })

  it("maps B variants to their paired story", () => {
    const result = findStoryByCode("037B")
    expect(result?.story.code).toBe("037A")
    expect(result?.variant).toBe("B")
  })

  it("returns null for unknown codes", () => {
    expect(findStoryByCode("999A")).toBeNull()
  })
})
