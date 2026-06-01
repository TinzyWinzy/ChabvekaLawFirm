import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { practiceAreas, getPracticeArea } from "@/lib/practice-areas";
import { site, telHref } from "@/lib/site";
import StructuredData from "@/components/StructuredData";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const area = getPracticeArea(params.slug);
  if (!area) return { title: "Practice Area" };
  return {
    title: area.title,
    description: area.metaDescription,
  };
}

export default function PracticeAreaPage({ params }: { params: { slug: string } }) {
  const area = getPracticeArea(params.slug);
  if (!area) notFound();

  return (
    <>
      <StructuredData pagePath={`/practice-areas/${area.slug}`} description={area.description} />
      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
            Practice Area
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-700">{area.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-700/80">{area.description}</p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-semibold text-navy-700">What we handle</h2>
              <ul className="mt-4 space-y-3 text-navy-700/80">
                {area.services.map((service) => (
                  <li key={service} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gold-500" />
                    {service}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-serif text-2xl font-semibold text-navy-700">How we work</h2>
              <ol className="mt-4 space-y-3 text-navy-700/80 list-decimal pl-5">
                <li>Book a consultation or send a confidential intake.</li>
                <li>We review your matter and confirm scope and fees in writing.</li>
                <li>You receive regular updates with clear next steps.</li>
              </ol>
            </div>
            <aside className="rounded-lg border border-navy-100 bg-white p-6 h-fit">
              <h3 className="font-serif text-xl font-semibold text-navy-700">Take the next step</h3>
              <p className="mt-2 text-sm text-navy-700/80">
                Book a consultation or speak with a member of our team directly.
              </p>
              <div className="mt-4 space-y-3">
                <Link
                  href="/book"
                  className="block text-center rounded-md bg-gold-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gold-600"
                >
                  Book a Consultation
                </Link>
                <a
                  href={telHref(site.phone)}
                  className="block text-center rounded-md border border-navy-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 hover:border-navy-500"
                >
                  Call {site.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
