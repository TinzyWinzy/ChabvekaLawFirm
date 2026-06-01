"use client";

import { useState } from "react";
import { practiceAreas } from "@/lib/practice-areas";

type Status = "idle" | "submitting" | "success" | "error";

export default function IntakeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-900">
        <p className="font-semibold">Your intake has been received.</p>
        <p className="mt-1 text-sm">
          A member of our team will review your case and follow up within one business day using your preferred contact method.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          className="mt-1 block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
        >
          <option value="">Select an area</option>
          {practiceAreas.map((area) => (
            <option key={area.slug} value={area.title}>
              {area.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="caseSummary" className="block text-sm font-medium text-navy-700">
          Brief summary of your case <span className="text-red-600">*</span>
        </label>
        <textarea
          id="caseSummary"
          name="caseSummary"
          required
          minLength={20}
          rows={5}
          className="mt-1 block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="Please share relevant facts, dates, and what outcome you are seeking."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-navy-700">
            Urgency <span className="text-red-600">*</span>
          </label>
          <select
            id="urgency"
            name="urgency"
            required
            defaultValue="medium"
            className="mt-1 block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="low">Low - researching options</option>
            <option value="medium">Medium - within a few weeks</option>
            <option value="high">High - immediate attention</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-navy-700">
            Budget range <span className="text-red-600">*</span>
          </label>
          <select
            id="budget"
            name="budget"
            required
            defaultValue=""
            className="mt-1 block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="" disabled>Select a range</option>
            <option value="under-500">Under USD 500</option>
            <option value="500-1500">USD 500 - 1,500</option>
            <option value="1500-5000">USD 1,500 - 5,000</option>
            <option value="5000-plus">USD 5,000+</option>
            <option value="retainer">Monthly retainer</option>
            <option value="discuss">Prefer to discuss</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredContact" className="block text-sm font-medium text-navy-700">
            Preferred contact <span className="text-red-600">*</span>
          </label>
          <select
            id="preferredContact"
            name="preferredContact"
            required
            defaultValue="phone"
            className="mt-1 block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex justify-center rounded-md bg-navy-700 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Intake"}
      </button>
    </form>
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
  const id = `i-${name}`;
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
