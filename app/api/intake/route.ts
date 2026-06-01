import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { intakeSchema } from "@/lib/validation";
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

  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    const { error } = await getSupabase().from("intake_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      practice_area: data.practiceArea,
      case_summary: data.caseSummary,
      urgency: data.urgency,
      budget: data.budget,
      preferred_contact: data.preferredContact,
    });

    if (error) throw error;
  } catch (err) {
    console.error("intake insert failed", err);
    if (err instanceof Error && err.message.includes("not configured")) {
      return NextResponse.json(
        { error: "The site is not yet configured to receive intake submissions." },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "We could not submit your intake. Please try again or call us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
