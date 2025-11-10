import { NextResponse } from "next/server";
import { z } from "zod";
import { findStoryByCode } from "@/lib/story";

const schema = z.object({
  code: z.string().regex(/^\d{3}[AB]$/i, "Formato inválido"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") ?? "";
  const parseResult = schema.safeParse({ code });

  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Parámetros inválidos" },
      { status: 400 }
    );
  }

  const story = findStoryByCode(parseResult.data.code);
  if (!story) {
    return NextResponse.json({ error: "Código no encontrado" }, { status: 404 });
  }

  return NextResponse.json(story);
}
