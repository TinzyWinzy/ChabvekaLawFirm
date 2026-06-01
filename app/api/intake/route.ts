import { NextResponse } from "next/server";
import { dbExecute } from "@/lib/db";
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
    await dbExecute(
      `INSERT INTO intake_submissions
        (name, email, phone, practice_area, case_summary, urgency, budget, preferred_contact)
       VALUES
        ($name, $email, $phone, $practiceArea, $caseSummary, $urgency, $budget, $preferredContact)`,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        practiceArea: data.practiceArea,
        caseSummary: data.caseSummary,
        urgency: data.urgency,
        budget: data.budget,
        preferredContact: data.preferredContact,
      },
    );
  } catch (err) {
    console.error("intake insert failed", err);
    return NextResponse.json(
      { error: "We could not submit your intake. Please try again or call us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
