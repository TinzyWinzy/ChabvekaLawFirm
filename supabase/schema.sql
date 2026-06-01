-- Chabveka Law Firm - Supabase schema
-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query).

CREATE TABLE IF NOT EXISTS intake_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  practice_area TEXT NOT NULL,
  case_summary TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high')),
  budget TEXT NOT NULL,
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('phone', 'email', 'whatsapp')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  practice_area TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (booking_date, time_slot)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (booking_date);

-- Recommended: enable Row Level Security and lock down the anon role.
-- The application uses the service role key, which bypasses RLS.
-- For production, also restrict network access to your Vercel deployment
-- via Supabase's API settings (Project -> Settings -> API).
