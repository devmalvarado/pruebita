import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(20).max(800),
});

const contactRequests: Array<z.infer<typeof contactSchema> & {
  id: string;
  createdAt: string;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const record = {
      ...data,
      id: `${Date.now()}-${data.email}`,
      createdAt: new Date().toISOString(),
    };

    contactRequests.push(record);

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
      { error: "No pudimos enviar tu mensaje." },
      { status: 500 },
    );
  }
}
