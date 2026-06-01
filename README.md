# Chabveka Law Firm - Website

Lead Accelerator package: a Next.js 14 website for a Zimbabwean law firm with a custom
booking engine, an advanced client intake form, and a contact form - all persisted to
Supabase (Postgres).

## What's included

- 6 practice area landing pages (Family, Criminal Defense, Corporate, Real Estate, Immigration, Personal Injury)
- Home, Practice Areas index, Contact, and Book pages
- Custom booking calendar (Mon-Fri, hourly slots, double-booking protection)
- Lead intake form with practice area, urgency, budget, and preferred contact method
- Contact form
- SEO: meta tags, JSON-LD `LegalService` structured data, sitemap, robots.txt
- Mobile responsive with a sticky call-to-action
- Security: server-side validation (Zod), honeypot, per-IP rate limiting, security headers
- Optimized for low-end Android devices (Samsung F13/A14, Tecno, Airtel)

## Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres) via `@supabase/supabase-js`
- **Validation:** Zod
- **Images:** Next/Image with Unsplash stock photos

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a free project at https://supabase.com
2. In your project, go to **SQL Editor** → New query → paste the contents of `supabase/schema.sql` → Run
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key (not the anon key) → `SUPABASE_SERVICE_ROLE_KEY`

Create `.env.local` from `.env.example` and fill in the values.

### 3. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000.

## Deployment to Vercel

### 1. Push to GitHub

Already done if you followed the earlier steps. If starting fresh:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/chabveka-law-firm.git
git push -u origin main
```

### 2. Import in Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will detect Next.js automatically

### 3. Set environment variables

In **Project Settings → Environment Variables**, add:

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | `https://your-project.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | The service_role key from Supabase |
| `NEXT_PUBLIC_SITE_URL` | Your production URL, e.g. `https://chabvekalaw.co.zw` |
| `NEXT_PUBLIC_FIRM_NAME` | Chabveka Law Firm |
| `NEXT_PUBLIC_FIRM_PHONE` | +263776519940 |
| `NEXT_PUBLIC_FIRM_EMAIL` | info@chabvekalaw.co.zw |
| `NEXT_PUBLIC_FIRM_ADDRESS` | Your office address |

### 4. Redeploy

After saving env vars, go to **Deployments** → click the three dots on the latest deployment → **Redeploy**.

## Project structure

```
app/
  api/
    contact/route.ts       Contact form handler
    intake/route.ts        Intake form handler
    slots/route.ts         Available time slots
    bookings/route.ts      Booking handler
  book/                    Booking page + confirmation
  contact/                 Contact page
  practice-areas/          Index + dynamic [slug] pages
  layout.tsx               Root layout with header/footer
  page.tsx                 Home
  globals.css              Tailwind base
  sitemap.ts               SEO sitemap
  robots.ts                SEO robots
components/                Reusable React components
lib/
  booking.ts               Time slot logic
  db.ts                    Supabase client
  practice-areas.ts        Practice area data
  rate-limit.ts            In-memory IP rate limit
  site.ts                  Firm contact details from env
  validation.ts            Zod schemas
supabase/
  schema.sql               Postgres schema (run once in Supabase SQL editor)
```

## Viewing submissions

In your Supabase project, go to **Table Editor**. You'll see three tables:
- `intake_submissions` - new client inquiries with practice area, urgency, budget
- `bookings` - consultation bookings (with date/time to prevent double-booking)
- `contact_messages` - general contact form submissions

You can sort, filter, and export to CSV directly from the dashboard.

## Customising the firm

All firm-specific copy and contact details live in environment variables and a few source files:

- **Practice areas:** edit `lib/practice-areas.ts`
- **Firm details:** edit `.env.local` (locally) and Vercel env vars (production)
- **Testimonials:** edit `components/Testimonials.tsx` (replace the sample copy with real client feedback)
- **Time slots / hours:** edit `lib/booking.ts`
- **Brand colors:** edit `tailwind.config.ts` (navy/gold are pre-defined)
- **Stock images:** swap the Unsplash URLs in `app/page.tsx`, `app/contact/page.tsx`, and `app/book/page.tsx` with branded photography
- **Stats bar numbers:** edit the `stats` array in `app/page.tsx`

## Notes on placeholders

- Practice areas use generic titles - rename them in `lib/practice-areas.ts` to match your firm's actual specialisms.
- Testimonials are clearly attributed to "Client A/B/C" and are intended as samples to replace.
- Office address and email are placeholders - update via env vars.
- Stock photos are from Unsplash and should be replaced with firm-branded photography before launch.
- Stats bar numbers (12+, 500+, etc.) are placeholders - update in `app/page.tsx`.

## Security checklist (Lead Accelerator package)

- [x] Full SSL (Vercel-provided, automatic on custom domains)
- [x] Server-side validation on all forms
- [x] Service role key (server-side only, never exposed to the browser)
- [x] Honeypot field to deter automated submissions
- [x] Per-IP rate limiting on form submissions
- [x] Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [x] No third-party tracking scripts
