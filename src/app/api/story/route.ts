import { NextResponse } from "next/server";

import { getStoryByCode, normalizeStoryCode } from "@/lib/story-utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Debes proporcionar un código." },
      { status: 400 },
    );
  }

  const story = getStoryByCode(normalizeStoryCode(code));

  if (!story) {
    return NextResponse.json({ error: "Historia no encontrada." }, { status: 404 });
  }

  return NextResponse.json(story);
}
