import { NextResponse } from "next/server";
import { z } from "zod";

const storySubmissionSchema = z.object({
  code: z.string().min(3).max(6),
  text: z.string().min(20).max(400),
  name: z.string().min(2).max(60).optional(),
});

const submittedStories: Array<z.infer<typeof storySubmissionSchema> & {
  id: string;
  createdAt: string;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = storySubmissionSchema.parse(body);

    const entry = {
      ...data,
      id: `${Date.now()}-${data.code}`,
      createdAt: new Date().toISOString(),
    };

    submittedStories.push(entry);

    return NextResponse.json(
      { status: "ok", received: entry },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", issues: error.flatten() },
        { status: 400 },
      );
    }

    console.error(error);
    return NextResponse.json(
      { error: "No se pudo registrar la historia." },
      { status: 500 },
    );
  }
}
