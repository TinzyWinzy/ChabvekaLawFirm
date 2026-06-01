import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { TIME_SLOTS, getBookableDates } from "@/lib/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Row = { booking_date: string; time_slot: string };

export async function GET() {
  const dates = getBookableDates();
  const start = dates[0];
  const end = dates[dates.length - 1];

  const { data, error } = await getSupabase()
    .from("bookings")
    .select("booking_date, time_slot")
    .gte("booking_date", start)
    .lte("booking_date", end);

  if (error) {
    console.error("slots query failed", error);
    return NextResponse.json({ error: "Could not load available times." }, { status: 500 });
  }

  const rows = (data ?? []) as Row[];
  const takenByDate = new Map<string, Set<string>>();
  for (const row of rows) {
    const key = row.booking_date.slice(0, 10);
    if (!takenByDate.has(key)) takenByDate.set(key, new Set());
    takenByDate.get(key)!.add(row.time_slot);
  }

  const slots = dates.map((date) => ({
    date,
    available: TIME_SLOTS.filter((slot) => !takenByDate.get(date)?.has(slot)),
  }));

  return NextResponse.json({ slots, allSlots: TIME_SLOTS });
}
