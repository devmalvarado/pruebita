import { NextRequest, NextResponse } from "next/server"
import { storySubmissionSchema } from "@/lib/validators"
import type { StorySubmissionPayload } from "@/lib/types"

type StoredSubmission = StorySubmissionPayload & {
  submittedAt: string
}

const storedStories: StoredSubmission[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const payload = storySubmissionSchema.parse(body)

    const submission: StoredSubmission = {
      ...payload,
      code: payload.code.toUpperCase(),
      submittedAt: new Date().toISOString(),
    }

    storedStories.push(submission)

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { error: "Invalid request payload" },
      {
        status: 400,
      },
    )
  }
}
