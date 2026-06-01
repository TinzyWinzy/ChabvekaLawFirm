import Link from "next/link";
import { site, telHref, mailHref } from "@/lib/site";
import { practiceAreas } from "@/lib/practice-areas";

export default function Footer() {
  return (
    <footer className="bg-navy-700 text-navy-100 mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p className="font-serif text-2xl font-semibold text-white">{site.name}</p>
            <p className="mt-3 text-sm text-navy-100/80">
              Professional legal counsel in Zimbabwe. Clear advice, practical solutions.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Practice Areas</p>
            <ul className="mt-3 space-y-2 text-sm">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="text-navy-100/80 hover:text-gold-400"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={telHref(site.phone)} className="text-navy-100/80 hover:text-gold-400">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={mailHref(site.email)} className="text-navy-100/80 hover:text-gold-400">
                  {site.email}
                </a>
              </li>
              <li className="text-navy-100/80">{site.address}</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Office Hours</p>
            <ul className="mt-3 space-y-1 text-sm text-navy-100/80">
              <li>{site.hours.weekday}</li>
              <li>{site.hours.saturday}</li>
              <li>{site.hours.sunday}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-navy-100/60 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            Attorney-Client privilege applies to all consultations. This website is for
            informational purposes and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
