export const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

export const BOOKING_HORIZON_DAYS = 30;

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isBusinessDay(d: Date): boolean {
  const day = d.getDay();
  return day >= 1 && day <= 5;
}

export function getBookableDates(now: Date = new Date()): string[] {
  const dates: string[] = [];
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  cursor.setDate(cursor.getDate() + 1);

  while (dates.length < BOOKING_HORIZON_DAYS) {
    if (isBusinessDay(cursor)) {
      dates.push(toISODate(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}
