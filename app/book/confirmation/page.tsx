import Link from "next/link";
import { site, telHref } from "@/lib/site";

type SearchParams = { [key: string]: string | string[] | undefined };

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(slot: string): string {
  const [h] = slot.split(":");
  const hour = parseInt(h, 10);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:00 ${suffix}`;
}

export default function ConfirmationPage({ searchParams }: { searchParams: SearchParams }) {
  const date = typeof searchParams.date === "string" ? searchParams.date : null;
  const time = typeof searchParams.time === "string" ? searchParams.time : null;
  const ref = typeof searchParams.ref === "string" ? searchParams.ref : null;

  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-lg border border-green-200 bg-green-50 p-8">
          <h1 className="font-serif text-3xl font-semibold text-green-900">
            Your consultation is booked
          </h1>
          <p className="mt-3 text-green-900/80">
            We have sent a confirmation to your email. If you do not see it within a few minutes,
            please check your spam folder or call us directly.
          </p>
          {date && time && (
            <div className="mt-6 rounded-md bg-white p-4 border border-green-200">
              <p className="text-sm text-green-900/70">When</p>
              <p className="text-lg font-semibold text-green-900">
                {formatDate(date)} at {formatTime(time)}
              </p>
              {ref && (
                <p className="mt-2 text-sm text-green-900/70">Reference: {ref}</p>
              )}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
            >
              Back to Home
            </Link>
            <a
              href={telHref(site.phone)}
              className="inline-flex items-center rounded-md border border-navy-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 hover:border-navy-500"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
