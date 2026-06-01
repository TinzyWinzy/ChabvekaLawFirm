import { createClient } from "@libsql/client";

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

const url = process.env.DATABASE_URL ?? "file:./local.db";
console.log(`Setting up schema at: ${url}`);

const client = createClient({
  url,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const statements = SCHEMA.split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const stmt of statements) {
  await client.execute(stmt);
}

console.log("Done. Tables are ready.");
process.exit(0);
