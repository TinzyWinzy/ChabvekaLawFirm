import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">404</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-700">Page not found</h1>
        <p className="mt-3 text-navy-700/80">
          The page you are looking for does not exist. Return to the home page or contact us.
        </p>
        <p className="mt-6 text-sm text-navy-700/60">Served by {site.name}</p>
      </div>
    </section>
  );
}
