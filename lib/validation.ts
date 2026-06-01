import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
const emailSchema = z.string().email("Please enter a valid email address");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: emailSchema,
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .refine((v) => !v || phoneRegex.test(v), "Phone number looks invalid"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
  website: z.string().max(0).optional(),
});

export const intakeSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
  phone: z.string().trim().regex(phoneRegex, "Phone number looks invalid"),
  practiceArea: z.string().min(1, "Please choose a practice area"),
  caseSummary: z.string().trim().min(20, "Please provide at least 20 characters").max(5000),
  urgency: z.enum(["low", "medium", "high"]),
  budget: z.string().trim().min(1, "Please indicate a budget range").max(120),
  preferredContact: z.enum(["phone", "email", "whatsapp"]),
  website: z.string().max(0).optional(),
});

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
  phone: z.string().trim().regex(phoneRegex, "Phone number looks invalid"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time slot"),
  practiceArea: z.string().min(1, "Please choose a practice area"),
  notes: z.string().trim().max(1000).optional(),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type IntakeInput = z.infer<typeof intakeSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
