import Image from "next/image";
import type { Metadata } from "next";
import BookingCalendar from "@/components/BookingCalendar";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Book a confidential consultation online. Choose a date and time that works for you.",
};

const BOOKING_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80";

export default function BookPage() {
  return (
    <>
      <StructuredData pagePath="/book" />
      <section className="relative bg-navy-700">
        <div className="absolute inset-0">
          <Image
            src={BOOKING_IMAGE}
            alt="Professional consultation meeting"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="font-serif text-4xl font-semibold text-white">Book a Consultation</h1>
          <p className="mt-3 text-navy-100/90 max-w-2xl">
            Choose a date and time below. Consultations are typically 60 minutes and can be held
            in person at our offices or by secure video call.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <BookingCalendar />
        </div>
      </section>
    </>
  );
}
