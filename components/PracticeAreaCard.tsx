import Link from "next/link";
import type { PracticeArea } from "@/lib/practice-areas";
import {
  FamilyIcon,
  ShieldIcon,
  BuildingIcon,
  HomeIcon,
  GlobeIcon,
  HeartPulseIcon,
} from "@/components/Icons";
import type { ComponentType, SVGProps } from "react";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "family-law": FamilyIcon,
  "criminal-defense": ShieldIcon,
  "corporate-law": BuildingIcon,
  "real-estate-law": HomeIcon,
  "immigration-law": GlobeIcon,
  "personal-injury": HeartPulseIcon,
};

export default function PracticeAreaCard({ area }: { area: PracticeArea }) {
  const Icon = iconMap[area.slug];
  return (
    <Link
      href={`/practice-areas/${area.slug}`}
      className="group relative block rounded-lg border border-navy-100 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-lg"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-500 group-hover:text-white">
        {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
      </div>
      <h3 className="mt-5 font-serif text-xl font-semibold text-navy-700">{area.title}</h3>
      <p className="mt-2 text-sm text-navy-700/80">{area.short}</p>
      <p className="mt-4 inline-flex items-center text-sm font-semibold text-gold-600">
        Learn more
        <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
      </p>
    </Link>
  );
}
