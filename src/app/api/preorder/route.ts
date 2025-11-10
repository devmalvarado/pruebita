import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  plan: z.enum(["single", "pair"]),
  email: z.string().email("Correo inválido."),
  name: z.string().min(1, "Incluye tu nombre."),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "ok",
    message: "Reserva registrada. Te contactaremos en breve.",
  });
}
