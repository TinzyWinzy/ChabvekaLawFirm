export type PracticeArea = {
  slug: string;
  title: string;
  short: string;
  description: string;
  services: string[];
  metaDescription: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "family-law",
    title: "Family Law",
    short: "Compassionate counsel for divorce, custody, and family disputes.",
    description:
      "Family matters require sensitivity, discretion, and a steady hand. We guide clients through divorce, custody arrangements, adoption, maintenance, and domestic relations with a focus on practical, dignified outcomes.",
    services: [
      "Divorce and separation",
      "Child custody and access",
      "Maintenance and support",
      "Adoption and guardianship",
      "Protection orders",
    ],
    metaDescription:
      "Family law services covering divorce, custody, maintenance, adoption, and protection orders in Zimbabwe.",
  },
  {
    slug: "criminal-defense",
    title: "Criminal Defense",
    short: "Skilled defense when your freedom is on the line.",
    description:
      "From the first police interview through trial and appeal, we provide aggressive, strategic criminal defense. We handle bail applications, plea negotiations, and full trial representation across the magistrates and High Court.",
    services: [
      "Bail and bail appeals",
      "Magistrates' court representation",
      "High Court trial defense",
      "Appeals and reviews",
      "Police station assistance",
    ],
    metaDescription:
      "Criminal defense representation in magistrates and High Court, bail applications, and appeals across Zimbabwe.",
  },
  {
    slug: "corporate-law",
    title: "Corporate & Commercial Law",
    short: "Strategic legal support for businesses at every stage.",
    description:
      "We advise start-ups, SMEs, and established companies on structuring, contracts, regulatory compliance, and dispute resolution. Our goal is to keep your business protected and moving forward.",
    services: [
      "Company registration and structuring",
      "Commercial contracts and shareholders' agreements",
      "Regulatory compliance",
      "Employment and labor matters",
      "Commercial dispute resolution",
    ],
    metaDescription:
      "Corporate law services for Zimbabwean businesses: registration, contracts, compliance, and dispute resolution.",
  },
  {
    slug: "real-estate-law",
    title: "Real Estate & Conveyancing",
    short: "Safe property transactions and conveyancing services.",
    description:
      "Buying, selling, or leasing property involves significant financial exposure. We conduct title searches, prepare and review agreements of sale, register transfers, and handle disputes over land and property.",
    services: [
      "Conveyancing and transfers",
      "Title searches and due diligence",
      "Sale and lease agreements",
      "Property disputes",
      "Mortgage and bond registration",
    ],
    metaDescription:
      "Conveyancing, title searches, property agreements, and real estate dispute resolution in Zimbabwe.",
  },
  {
    slug: "immigration-law",
    title: "Immigration Law",
    short: "Visas, residency, and citizenship made straightforward.",
    description:
      "Navigating Zimbabwe's immigration framework can be complex. We assist individuals and corporates with visa applications, work permits, residency, citizenship, and immigration appeals.",
    services: [
      "Work permits and temporary employment visas",
      "Residency applications",
      "Citizenship by birth, descent, or registration",
      "Immigration appeals and reviews",
      "Corporate immigration compliance",
    ],
    metaDescription:
      "Immigration lawyers in Zimbabwe: work permits, residency, citizenship, and immigration appeals.",
  },
  {
    slug: "personal-injury",
    title: "Personal Injury",
    short: "Fighting for fair compensation after injury or accident.",
    description:
      "If you have been injured through someone else's negligence, you may be entitled to compensation. We pursue claims arising from road accidents, workplace injuries, medical negligence, and other incidents.",
    services: [
      "Road accident claims",
      "Workplace injury claims",
      "Medical negligence",
      "Insurance disputes",
      "Wrongful death claims",
    ],
    metaDescription:
      "Personal injury lawyers in Zimbabwe: road accident, workplace injury, and medical negligence claims.",
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}
