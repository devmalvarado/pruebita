import { describe, expect, it } from "vitest";

import { abStories } from "@/lib/data";
import { getStoryByCode, normalizeStoryCode } from "@/lib/story-utils";

describe("normalizeStoryCode", () => {
  it("convierte el código a mayúsculas sin espacios", () => {
    expect(normalizeStoryCode(" 037a ")).toBe("037A");
    expect(normalizeStoryCode("11 8 b")).toBe("118B");
  });
});

describe("getStoryByCode", () => {
  it("regresa la historia cuando el código existe", () => {
    const baseStory = abStories[0];
    const result = getStoryByCode(baseStory.code);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(baseStory.code);
    expect(result?.a).toBe(baseStory.a);
    expect(result?.b).toBe(baseStory.b);
  });

  it("permite buscar con códigos terminados en B", () => {
    const baseStory = abStories.find((story) => story.b);
    expect(baseStory).toBeDefined();
    const result = getStoryByCode(`${baseStory!.code.slice(0, -1)}B`);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(`${baseStory!.code.slice(0, -1)}B`);
    expect(result?.a).toBe(baseStory?.a);
    expect(result?.b).toBe(baseStory?.b);
  });

  it("regresa null para códigos inexistentes", () => {
    expect(getStoryByCode("999Z")).toBeNull();
  });
});
