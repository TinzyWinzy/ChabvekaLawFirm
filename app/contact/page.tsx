import Image from "next/image";
import type { Metadata } from "next";
import { site, telHref, mailHref } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our firm by phone, email, or by sending us a message.",
};

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=70";

export default function ContactPage() {
  return (
    <>
      <StructuredData pagePath="/contact" />
      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-4xl font-semibold text-navy-700">Contact Us</h1>
          <p className="mt-3 text-navy-700/80 max-w-2xl">
            Reach out by phone, email, or by sending a message. We respond to all inquiries within one business day.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-semibold text-navy-700">Send a message</h2>
              <p className="mt-2 text-sm text-navy-700/80">
                For confidential matters, please call us or use our intake form.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
            <aside className="space-y-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-navy-100">
                <Image
                  src={OFFICE_IMAGE}
                  alt="Modern professional office space"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  quality={70}
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg border border-navy-100 bg-white p-6">
                <h3 className="font-serif text-xl font-semibold text-navy-700">Direct contact</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <p className="text-navy-700/70">Phone</p>
                    <a href={telHref(site.phone)} className="text-navy-700 font-semibold hover:text-gold-600">
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <p className="text-navy-700/70">Email</p>
                    <a href={mailHref(site.email)} className="text-navy-700 font-semibold hover:text-gold-600 break-all">
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-navy-700/70">Office</p>
                    <p className="text-navy-700 font-semibold">{site.address}</p>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-navy-100 bg-white p-6">
                <h3 className="font-serif text-xl font-semibold text-navy-700">Office hours</h3>
                <ul className="mt-4 space-y-1 text-sm text-navy-700/80">
                  <li>{site.hours.weekday}</li>
                  <li>{site.hours.saturday}</li>
                  <li>{site.hours.sunday}</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
