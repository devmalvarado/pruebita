import { NextResponse } from "next/server";
import { z } from "zod";
import { addStorySubmission } from "@/lib/story";

const schema = z.object({
  code: z.string().regex(/^\d{3}[AB]$/i, "Formato de código inválido."),
  text: z.string().min(20, "Comparte al menos 20 caracteres."),
  name: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  addStorySubmission({
    ...parsed.data,
    name: parsed.data.name?.trim(),
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ status: "ok" });
}
