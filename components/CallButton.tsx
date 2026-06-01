import { site, telHref } from "@/lib/site";

export default function CallButton() {
  return (
    <a
      href={telHref(site.phone)}
      className="sm:hidden fixed bottom-4 right-4 z-50 inline-flex items-center rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-gold-600"
    >
      Call Now
    </a>
  );
}
