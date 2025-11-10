import { NextRequest, NextResponse } from "next/server"
import { preorderSchema } from "@/lib/validators"

type StoredPreorder = {
  id: string
  plan: "single" | "pair"
  email: string
  name: string
  createdAt: string
}

const preorders: StoredPreorder[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const payload = preorderSchema.parse(body)

    const preorder: StoredPreorder = {
      ...payload,
      id: `pre-${Date.now()}`,
      plan: payload.plan,
      createdAt: new Date().toISOString(),
    }

    preorders.push(preorder)

    return NextResponse.json({ status: "ok" }, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 })
  }
}
