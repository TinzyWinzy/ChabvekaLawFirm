import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FamilyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1.5a5.5 5.5 0 0111 0V20" />
      <circle cx="17" cy="9" r="2" />
      <path d="M15 20v-1a3.5 3.5 0 015.5-2.8" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9.5-4.6-1-8-5-8-9.5V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-3 7 3v14" />
      <path d="M9 11h.01M9 14h.01M9 17h.01M15 11h.01M15 14h.01M15 17h.01" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h3l2-5 4 10 3-7 2 2h4" />
      <path d="M19.5 11.5a5.5 5.5 0 00-9-4.1 5.5 5.5 0 00-9 4.1c0 5 9 9 9 9s9-4 9-9z" />
    </svg>
  );
}
