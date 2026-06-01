import Image from "next/image";
import Link from "next/link";
import { practiceAreas } from "@/lib/practice-areas";
import { site, telHref } from "@/lib/site";
import PracticeAreaCard from "@/components/PracticeAreaCard";
import Testimonials from "@/components/Testimonials";
import StructuredData from "@/components/StructuredData";
import Reveal from "@/components/Reveal";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80";

const stats = [
  { value: "12+", label: "Years of Practice" },
  { value: "500+", label: "Matters Resolved" },
  { value: "6", label: "Practice Areas" },
  { value: "24h", label: "Response Time" },
];

const whyUs = [
  {
    title: "Direct lawyer access",
    body: "You speak with the lawyer handling your matter - not a call center or intermediary.",
  },
  {
    title: "Transparent fees",
    body: "We confirm scope and fees in writing before any work begins. No surprises.",
  },
  {
    title: "Practical counsel",
    body: "We focus on outcomes. We tell you what to do - and what to avoid.",
  },
  {
    title: "Confidential intake",
    body: "Online booking, secure forms, and a private client portal protect your information.",
  },
];

export default function HomePage() {
  return (
    <>
      <StructuredData pagePath="/" />

      {/* Full-bleed hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <div className="max-w-2xl text-white">
            <p className="hero-fade text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
              Professional Legal Counsel - Zimbabwe
            </p>
            <h1 className="hero-fade hero-fade-delay-1 mt-5 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              Clear advice.<br />
              <span className="text-gold-400">Practical results.</span>
            </h1>
            <p className="hero-fade hero-fade-delay-2 mt-6 text-lg sm:text-xl text-navy-100/90 max-w-xl">
              {site.name} serves individuals, families, and businesses across Zimbabwe.
              Book a confidential consultation online, or speak with us directly.
            </p>
            <div className="hero-fade hero-fade-delay-3 mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-900/20 transition hover:bg-gold-600 hover:shadow-xl"
              >
                Book a Consultation
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <a
                href={telHref(site.phone)}
                className="text-sm font-semibold text-white/90 underline-offset-4 hover:text-gold-400 hover:underline"
              >
                or call {site.phone}
              </a>
            </div>
            <ul className="hero-fade hero-fade-delay-4 mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-navy-100/80">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Free initial consultation
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Same-day response
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Confidential from first contact
              </li>
            </ul>
          </div>
        </div>
        <div className="hero-fade hero-fade-delay-4 absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/60 md:block">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-navy-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <dt className="order-2 mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-navy-700/70">
                  {s.label}
                </dt>
                <dd className="order-1 font-serif text-4xl sm:text-5xl font-semibold text-gold-600">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why clients choose us */}
      <Reveal>
        <section>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
                Why clients choose us
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-navy-700">
                Focused on outcomes, not billable hours.
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((item) => (
                <div key={item.title} className="relative pl-4 border-l-2 border-gold-500">
                  <h3 className="font-serif text-lg font-semibold text-navy-700">{item.title}</h3>
                  <p className="mt-2 text-sm text-navy-700/80">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Practice areas */}
      <Reveal>
        <section className="border-t border-navy-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
                  Practice Areas
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-navy-700">
                  Where we can help.
                </h2>
              </div>
              <Link href="/practice-areas" className="text-sm font-semibold text-gold-600 hover:text-gold-500">
                View all areas &rarr;
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map((area) => (
                <PracticeAreaCard key={area.slug} area={area} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Testimonials />

      <Reveal>
        <section className="relative isolate overflow-hidden bg-navy-700">
          <div className="absolute inset-0 -z-10 opacity-30">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              Ready to talk?
            </h2>
            <p className="mt-3 text-lg text-navy-100/85">
              Most initial consultations can be scheduled within two business days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-gold-600"
              >
                Book a Consultation &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Send a Message
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
