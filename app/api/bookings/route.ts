import { NextResponse } from "next/server";
import { getSupabase, UNIQUE_VIOLATION } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";
import { rateLimit, getClientKey } from "@/lib/rate-limit";
import { TIME_SLOTS, getBookableDates, isBusinessDay } from "@/lib/booking";

export const runtime = "nodejs";

type PostgrestError = { code?: string; message?: string };

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

  const parsed = bookingSchema.safeParse(body);
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

  const allowedDates = new Set(getBookableDates());
  if (!allowedDates.has(data.date) || !TIME_SLOTS.includes(data.timeSlot)) {
    return NextResponse.json({ error: "That date or time is not available." }, { status: 400 });
  }
  const dateObj = new Date(`${data.date}T00:00:00`);
  if (isNaN(dateObj.getTime()) || !isBusinessDay(dateObj)) {
    return NextResponse.json({ error: "Bookings are only available Monday to Friday." }, { status: 400 });
  }

  try {
    const { data: inserted, error } = await getSupabase()
      .from("bookings")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        booking_date: data.date,
        time_slot: data.timeSlot,
        practice_area: data.practiceArea,
        notes: data.notes ?? null,
      })
      .select("id, booking_date, time_slot")
      .single();

    if (error) throw error;

    const row = inserted as { id: number; booking_date: string; time_slot: string };
    return NextResponse.json({
      ok: true,
      bookingId: row.id,
      date: row.booking_date.slice(0, 10),
      timeSlot: row.time_slot,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("not configured")) {
      return NextResponse.json(
        { error: "The site is not yet configured to take bookings." },
        { status: 503 },
      );
    }
    const pgError = err as PostgrestError;
    if (pgError?.code === UNIQUE_VIOLATION) {
      return NextResponse.json(
        { error: "That time slot was just taken. Please choose another." },
        { status: 409 },
      );
    }
    console.error("booking insert failed", err);
    return NextResponse.json(
      { error: "We could not confirm your booking. Please try again or call us." },
      { status: 500 },
    );
  }
}
