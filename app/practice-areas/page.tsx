import type { Metadata } from "next";
import { practiceAreas } from "@/lib/practice-areas";
import PracticeAreaCard from "@/components/PracticeAreaCard";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Explore the practice areas covered by our firm: family law, criminal defense, corporate, real estate, immigration, and personal injury.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <StructuredData pagePath="/practice-areas" />
      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-4xl font-semibold text-navy-700">Practice Areas</h1>
          <p className="mt-3 text-navy-700/80 max-w-2xl">
            We focus on six core areas of law to deliver deep, practical experience for our clients.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area) => (
              <PracticeAreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
