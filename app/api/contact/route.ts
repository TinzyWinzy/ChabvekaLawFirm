import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { rateLimit, getClientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const limit = rateLimit(getClientKey(req));
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, phone, message, website } = parsed.data;
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    const { error } = await getSupabase()
      .from("contact_messages")
      .insert({ name, email, phone: phone ?? null, message });

    if (error) throw error;
  } catch (err) {
    console.error("contact insert failed", err);
    if (err instanceof Error && err.message.includes("not configured")) {
      return NextResponse.json(
        { error: "The site is not yet configured to receive messages." },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
