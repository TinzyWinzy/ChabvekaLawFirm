import { site } from "@/lib/site";

type Props = {
  pagePath?: string;
  description?: string;
};

export default function StructuredData({ pagePath, description }: Props) {
  const url = pagePath ? `${site.url}${pagePath}` : site.url;
  const ld = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.name,
    url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "ZW",
    },
    areaServed: "Zimbabwe",
    description: description ?? `${site.name} - professional legal services in Zimbabwe.`,
    priceRange: "$$",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
