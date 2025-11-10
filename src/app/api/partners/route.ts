import { NextResponse } from "next/server";
import { z } from "zod";

const partnerSchema = z.object({
  businessName: z.string().min(2).max(120),
  contactName: z.string().min(2).max(80),
  email: z.string().email(),
  city: z.string().min(2).max(80),
  message: z.string().min(20).max(600),
});

const partnerRequests: Array<z.infer<typeof partnerSchema> & {
  id: string;
  createdAt: string;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = partnerSchema.parse(body);

    const record = {
      ...data,
      id: `${Date.now()}-${data.businessName}`,
      createdAt: new Date().toISOString(),
    };

    partnerRequests.push(record);

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
      { error: "No pudimos registrar tu solicitud." },
      { status: 500 },
    );
  }
}
