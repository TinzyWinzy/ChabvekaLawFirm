"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { practiceAreas } from "@/lib/practice-areas";

type Slot = { date: string; available: string[] };
type SlotsResponse = { slots: Slot[]; allSlots: string[] };
type Status = "idle" | "loading" | "submitting" | "error";

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
}

function formatDateLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(slot: string): string {
  const [h] = slot.split(":");
  const hour = parseInt(h, 10);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:00 ${suffix}`;
}

export default function BookingCalendar() {
  const router = useRouter();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [allSlots, setAllSlots] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/slots", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load available times");
        const data: SlotsResponse = await res.json();
        if (cancelled) return;
        setSlots(data.slots);
        setAllSlots(data.allSlots);
        setStatus("idle");
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of slots) {
      const d = new Date(`${s.date}T00:00:00`);
      const month = d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
      if (!map.has(month)) map.set(month, []);
      map.get(month)!.push(s);
    }
    return Array.from(map.entries());
  }, [slots]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      setSubmitError("Please choose a date and time.");
      return;
    }
    setStatus("submitting");
    setSubmitError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, date: selectedDate, timeSlot: selectedSlot }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Booking failed");

      const params = new URLSearchParams({
        date: selectedDate,
        time: selectedSlot,
        ref: String(body.bookingId ?? ""),
      });
      router.push(`/book/confirmation?${params.toString()}`);
    } catch (err) {
      setStatus("idle");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "loading") {
    return <p className="text-sm text-navy-700">Loading available times...</p>;
  }
  if (status === "error") {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-navy-700">1. Choose a date</h2>
        <div className="mt-4 space-y-6">
          {grouped.map(([month, monthSlots]) => (
            <div key={month}>
              <p className="text-sm font-semibold text-navy-700">{month}</p>
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2">
                {monthSlots.map((s) => {
                  const isFull = s.available.length === 0;
                  const isActive = s.date === selectedDate;
                  return (
                    <button
                      key={s.date}
                      type="button"
                      disabled={isFull}
                      onClick={() => {
                        setSelectedDate(s.date);
                        setSelectedSlot(null);
                      }}
                      className={`rounded-md border px-2 py-2 text-xs sm:text-sm transition ${
                        isActive
                          ? "border-gold-500 bg-gold-500 text-white"
                          : isFull
                            ? "border-navy-100 bg-navy-50 text-navy-100 cursor-not-allowed"
                            : "border-navy-100 bg-white text-navy-700 hover:border-gold-500 hover:text-gold-600"
                      }`}
                    >
                      {formatDate(s.date)}
                      {isFull && <span className="block text-[10px]">Full</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h2 className="text-lg font-semibold text-navy-700">2. Choose a time</h2>
          <p className="text-sm text-navy-700/80">{formatDateLong(selectedDate)}</p>
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {allSlots.map((slot) => {
              const available = slots
                .find((s) => s.date === selectedDate)
                ?.available.includes(slot);
              const isActive = slot === selectedSlot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!available}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-md border px-2 py-2 text-sm transition ${
                    isActive
                      ? "border-gold-500 bg-gold-500 text-white"
                      : available
                        ? "border-navy-100 bg-white text-navy-700 hover:border-gold-500 hover:text-gold-600"
                        : "border-navy-100 bg-navy-50 text-navy-100 cursor-not-allowed"
                  }`}
                >
                  {formatTime(slot)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedDate && selectedSlot && (
        <form onSubmit={onSubmit} className="space-y-4 border-t border-navy-100 pt-6">
          <h2 className="text-lg font-semibold text-navy-700">3. Your details</h2>
          <p className="text-sm text-navy-700/80">
            Booking for <span className="font-semibold">{formatDateLong(selectedDate)}</span> at{" "}
            <span className="font-semibold">{formatTime(selectedSlot)}</span>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Phone" name="phone" type="tel" required />
          <div>
            <label htmlFor="practiceArea" className="block text-sm font-medium text-navy-700">
              Practice area <span className="text-red-600">*</span>
            </label>
            <select
              id="practiceArea"
              name="practiceArea"
              required
              defaultValue=""
              className="mt-1 block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            >
              <option value="" disabled>Select an area</option>
              {practiceAreas.map((area) => (
                <option key={area.slug} value={area.title}>
                  {area.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-navy-700">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              placeholder="Anything we should know before the consultation?"
            />
          </div>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          {submitError && <p className="text-sm text-red-600">{submitError}</p>}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex justify-center rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 disabled:opacity-60"
          >
            {status === "submitting" ? "Confirming..." : "Confirm Booking"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `b-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy-700">
        {label}{required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-1 block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
      />
    </div>
  );
}
