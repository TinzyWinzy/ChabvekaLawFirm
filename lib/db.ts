import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.",
    );
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export const UNIQUE_VIOLATION = "23505";
