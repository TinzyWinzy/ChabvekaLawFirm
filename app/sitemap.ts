import type { MetadataRoute } from "next";
import { practiceAreas } from "@/lib/practice-areas";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");
  const staticUrls = ["", "/practice-areas", "/book", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const practiceUrls = practiceAreas.map((area) => ({
    url: `${base}/practice-areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticUrls, ...practiceUrls];
}
