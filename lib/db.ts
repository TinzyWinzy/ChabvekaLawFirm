import { createClient, type Client, type InValue } from "@libsql/client";

export type IntakeSubmission = {
  id: number;
  name: string;
  email: string;
  phone: string;
  practice_area: string;
  case_summary: string;
  urgency: "low" | "medium" | "high";
  budget: string;
  preferred_contact: "phone" | "email" | "whatsapp";
  created_at: string;
};

export type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  time_slot: string;
  practice_area: string;
  notes: string | null;
  created_at: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

const SCHEMA = `
CREATE TABLE IF NOT EXISTS intake_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  practice_area TEXT NOT NULL,
  case_summary TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('low','medium','high')),
  budget TEXT NOT NULL,
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('phone','email','whatsapp')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  booking_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  practice_area TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (booking_date, time_slot)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (booking_date);
`;

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

function getClient(): Client {
  if (client) return client;
  const url = process.env.DATABASE_URL ?? "file:./local.db";
  client = createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  return client;
}

export async function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    const statements = SCHEMA.split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const stmt of statements) {
      await getClient().execute(stmt);
    }
  })();
  return schemaReady;
}

type SqlParam = InValue;

export async function dbQuery<T = Record<string, unknown>>(
  sql: string,
  args: Record<string, SqlParam> | SqlParam[] = [],
): Promise<T[]> {
  await ensureSchema();
  const result = await getClient().execute({ sql, args: args as InValue[] | Record<string, InValue> });
  return result.rows as unknown as T[];
}

export async function dbExecute(
  sql: string,
  args: Record<string, SqlParam> | SqlParam[] = [],
): Promise<{ lastInsertRowid: number | bigint; rowsAffected: number }> {
  await ensureSchema();
  const result = await getClient().execute({ sql, args: args as InValue[] | Record<string, InValue> });
  return {
    lastInsertRowid: result.lastInsertRowid ?? 0,
    rowsAffected: result.rowsAffected,
  };
}
