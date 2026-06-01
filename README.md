# Chabveka Law Firm - Website

Lead Accelerator package: a Next.js 14 website for a Zimbabwean law firm with a custom
booking engine, an advanced client intake form, and a contact form - all persisted to
a lightweight SQLite-compatible database (libSQL).

## What's included

- 6 practice area landing pages (Family, Criminal Defense, Corporate, Real Estate, Immigration, Personal Injury)
- Home, Practice Areas index, Contact, and Book pages
- Custom booking calendar (Mon-Fri, hourly slots, double-booking protection)
- Lead intake form with practice area, urgency, budget, and preferred contact method
- Contact form
- SEO: meta tags, JSON-LD `LegalService` structured data, sitemap, robots.txt
- Mobile responsive with a sticky call-to-action
- Security: server-side validation (Zod), honeypot, per-IP rate limiting, security headers
- Honeypot field and parameterized SQL queries
- Database schema auto-created on first request

## Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Database:** libSQL via `@libsql/client` (local file in dev, Turso in production)
- **Validation:** Zod
- **Images:** Next/Image with Unsplash stock photos

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Database

No setup needed. By default the app uses a local SQLite file at `./local.db`. The
schema is created automatically on the first form submission.

To pre-create the schema:

```bash
npm run db:setup
```

To use a custom path or remote Turso, create `.env.local`:

```bash
# Local file in a different location
DATABASE_URL=file:./data/chabveka.db

# Or Turso (recommended for production)
DATABASE_URL=libsql://your-db.turso.io
DATABASE_AUTH_TOKEN=your-turso-token
```

### 3. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000.

## Deployment to Vercel (with Turso)

Vercel's serverless filesystem is read-only, so the local SQLite file won't persist
between requests. Use [Turso](https://turso.tech) (free tier: 500 databases, 9GB storage)
for production.

### 1. Create a Turso database

```bash
# Install the Turso CLI
npm install -g @turso/cli

# Sign in and create a database
turso auth signup
turso db create chabveka-law-firm
turso db show chabveka-law-firm --url
turso db tokens create chabveka-law-firm
```

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/chabveka-law-firm.git
git push -u origin main
```

### 3. Import in Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will detect Next.js automatically

### 4. Set environment variables

In **Project Settings > Environment Variables**, add:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | `libsql://chabveka-law-firm.turso.io` (from `turso db show`) |
| `DATABASE_AUTH_TOKEN` | The token from `turso db tokens create` |
| `NEXT_PUBLIC_SITE_URL` | Your production URL, e.g. `https://chabvekalaw.co.zw` |
| `NEXT_PUBLIC_FIRM_NAME` | Chabveka Law Firm |
| `NEXT_PUBLIC_FIRM_PHONE` | +263776519940 |
| `NEXT_PUBLIC_FIRM_EMAIL` | info@chabvekalaw.co.zw |
| `NEXT_PUBLIC_FIRM_ADDRESS` | Your office address |

### 5. Initialize the schema (one-time)

From your local machine with the production env vars set:

```bash
DATABASE_URL=libsql://chabveka-law-firm.turso.io \
DATABASE_AUTH_TOKEN=your-token \
npm run db:setup
```

### 6. Deploy

Vercel will build and deploy automatically on every push to main.

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
  db.ts                    libSQL client + schema
  practice-areas.ts        Practice area data
  rate-limit.ts            In-memory IP rate limit
  site.ts                  Firm contact details from env
  validation.ts            Zod schemas
scripts/
  setup-db.mjs             Manual schema setup
```

## Customising the firm

All firm-specific copy and contact details live in environment variables and a few source files:

- **Practice areas:** edit `lib/practice-areas.ts`
- **Firm details:** edit `.env.local` (locally) and Vercel env vars (production)
- **Testimonials:** edit `components/Testimonials.tsx` (replace the sample copy with real client feedback)
- **Time slots / hours:** edit `lib/booking.ts`
- **Brand colors:** edit `tailwind.config.ts` (navy/gold are pre-defined)
- **Stock images:** swap the Unsplash URLs in `app/page.tsx`, `app/contact/page.tsx`, and `app/book/page.tsx` with branded photography

## Notes on placeholders

- Practice areas use generic titles - rename them in `lib/practice-areas.ts` to match your firm's actual specialisms.
- Testimonials are clearly attributed to "Client A/B/C" and are intended as samples to replace.
- Office address and email are placeholders - update via env vars.
- Stock photos are from Unsplash and should be replaced with firm-branded photography before launch.

## Security checklist (Lead Accelerator package)

- [x] Full SSL (Vercel-provided, automatic on custom domains)
- [x] Server-side validation on all forms
- [x] Parameterized SQL queries
- [x] Honeypot field to deter automated submissions
- [x] Per-IP rate limiting on form submissions
- [x] Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [x] No third-party tracking scripts
