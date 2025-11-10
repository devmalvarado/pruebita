import { NextRequest, NextResponse } from "next/server"
import { buildStoryResponse } from "@/lib/story"
import { storyCodeSchema } from "@/lib/validators"

export const runtime = "edge"

export function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.json(
      { error: "Code query param is required" },
      { status: 400 },
    )
  }

  const parsed = storyCodeSchema.safeParse(code)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? "Invalid code" }, { status: 400 })
  }

  return buildStoryResponse(parsed.data)
}
