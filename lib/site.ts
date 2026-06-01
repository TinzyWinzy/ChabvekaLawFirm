export const site = {
  name: process.env.NEXT_PUBLIC_FIRM_NAME ?? "Chabveka Law Firm",
  phone: process.env.NEXT_PUBLIC_FIRM_PHONE ?? "+263776519940",
  email: process.env.NEXT_PUBLIC_FIRM_EMAIL ?? "info@chabvekalaw.co.zw",
  address: process.env.NEXT_PUBLIC_FIRM_ADDRESS ?? "123 Samora Machel Avenue, Harare, Zimbabwe",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chabvekalaw.co.zw",
  hours: {
    weekday: "Monday - Friday: 8:00 AM - 5:00 PM",
    saturday: "Saturday: 9:00 AM - 1:00 PM",
    sunday: "Sunday: Closed",
  },
};

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function mailHref(email: string): string {
  return `mailto:${email}`;
}
