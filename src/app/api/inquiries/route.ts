import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, eventType } = body ?? {};

    if (!name || !email || !eventType) {
      return NextResponse.json(
        { error: "name, email and eventType are required" },
        { status: 400 }
      );
    }

    // Simulated success for static version
    return NextResponse.json({ ok: true, id: Date.now() }, { status: 201 });
  } catch (err) {
    console.error("inquiry error", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
