import Link from "next/link";
import { site, telHref } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-navy-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-semibold text-navy-700">
              {site.name}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-navy-700">
            <Link href="/" className="hover:text-gold-500">Home</Link>
            <Link href="/practice-areas" className="hover:text-gold-500">Practice Areas</Link>
            <Link href="/book" className="hover:text-gold-500">Book Consultation</Link>
            <Link href="/contact" className="hover:text-gold-500">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={telHref(site.phone)}
              className="hidden sm:inline-flex items-center rounded-md bg-navy-700 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-600"
            >
              Call {site.phone}
            </a>
            <Link
              href="/book"
              className="inline-flex items-center rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-600"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
