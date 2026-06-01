import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallButton from "@/components/CallButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Professional Legal Services in Zimbabwe`,
    template: `%s | ${site.name}`,
  },
  description:
    `${site.name} provides clear, professional legal counsel across family, criminal, corporate, real estate, immigration, and personal injury matters in Zimbabwe.`,
  openGraph: {
    type: "website",
    locale: "en_ZW",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10233a",
};

const JS_LOADED_SCRIPT = `document.documentElement.classList.add('js-loaded');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-navy-700 font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: JS_LOADED_SCRIPT }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <CallButton />
      </body>
    </html>
  );
}
