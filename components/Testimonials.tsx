type Testimonial = {
  quote: string;
  name: string;
  caseType: string;
  outcome: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They took the time to explain every option and the fees upfront. I felt informed at each step, and we resolved the matter faster than I expected.",
    name: "Client A",
    caseType: "Family Law",
    outcome: "Settlement reached",
  },
  {
    quote:
      "Professional, responsive, and straight to the point. I appreciated the direct advice on what to do and what to avoid.",
    name: "Client B",
    caseType: "Commercial Dispute",
    outcome: "Favorable resolution",
  },
  {
    quote:
      "The team handled my property transfer end-to-end. The conveyancing was smooth and the title handover was on time.",
    name: "Client C",
    caseType: "Conveyancing",
    outcome: "Title registered",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-navy-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-serif text-3xl font-semibold text-navy-700">Client Results</h2>
        <p className="mt-2 text-navy-700/80 max-w-2xl">
          Representative feedback from clients we have assisted. Names withheld for confidentiality.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <figure
              key={idx}
              className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm"
            >
              <blockquote className="text-sm text-navy-700">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm">
                <p className="font-semibold text-navy-700">{t.name}</p>
                <p className="text-navy-700/70">
                  {t.caseType} - {t.outcome}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
