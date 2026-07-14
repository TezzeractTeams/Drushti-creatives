// Client logos used in OurClients marquee and Testimonials cards.
// Images live in public/clients/ (numbered 1–17).

export const CLIENT_LOGOS = [
  "/clients/1.png",
  "/clients/2.png",
  "/clients/3.png",
  "/clients/4.png",
  "/clients/5.png",
  "/clients/6.png",
  "/clients/7.png",
  "/clients/8.png",
  "/clients/9.png",
  "/clients/10.png",
  "/clients/11.png",
  "/clients/12.png",
  "/clients/13.png",
  "/clients/14.png",
  "/clients/15.png",
  "/clients/16.png",
  "/clients/17.png",
] as const;

export const COMPANY_LOGO_MAP: Record<string, string> = {
  Norlanka: "/clients/4.png",
  "Wild Drift": "/clients/8.png",
  "Skill Gate": "/clients/11.png",
  "Skill Gate - Sri Lanka": "/clients/11.png",
  "Fairfirst Insurance Limited": "/clients/1.png",
  "Fairfirst Insurance": "/clients/1.png",
};

export function getCompanyLogo(company: string): string | undefined {
  return COMPANY_LOGO_MAP[company];
}
