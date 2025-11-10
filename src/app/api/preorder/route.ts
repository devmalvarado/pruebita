import { NextResponse } from "next/server";
import { z } from "zod";

const preorderSchema = z.object({
  plan: z.enum(["single", "pair"]),
  email: z.string().email(),
  name: z.string().min(2).max(80),
});

const preorderRequests: Array<z.infer<typeof preorderSchema> & {
  id: string;
  createdAt: string;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = preorderSchema.parse(body);

    const record = {
      ...data,
      id: `${Date.now()}-${data.plan}`,
      createdAt: new Date().toISOString(),
    };

    preorderRequests.push(record);

    return NextResponse.json({ status: "ok" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", issues: error.flatten() },
        { status: 400 },
      );
    }

    console.error(error);
    return NextResponse.json(
      { error: "No pudimos registrar tu preventa." },
      { status: 500 },
    );
  }
}
