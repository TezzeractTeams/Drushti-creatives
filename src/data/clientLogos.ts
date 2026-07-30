// Client logos used in OurClients marquee and Testimonials cards.
// Images live in public/clients/ (named "Drushti Client - {Company}.png").

export const CLIENT_LOGOS = [
  "/clients/Drushti Client - Fairfirst Insurance.png",
  "/clients/Drushti Client - Uber Eats.png",
  "/clients/Drushti Client - Uber.png",
  "/clients/Drushti Client - Norlanka.png",
  "/clients/Drushti Client - Advantis.png",
  "/clients/Drushti Client - Taj Samudra Colombo.png",
  "/clients/Drushti Client - Softlogic.png",
  "/clients/Drushti Client - Wild Drift.png",
  "/clients/Drushti Client - 361 Degrees.png",
  "/clients/Drushti Client - CINEC Campus.png",
  "/clients/Drushti Client - Skill Gate.png",
  "/clients/Drushti Client - Mother Charitable Foundation.png",
  "/clients/Drushti Client - STEMS.png",
  "/clients/Drushti Client - Gypsum Interior Decor.png",
  "/clients/Drushti Client - The Auresta Colombo.png",
  "/clients/Drushti Client - Madeeda Hospitals.png",
  "/clients/Drushti Client - Transwing Logistics (Pvt) Ltd.png",
] as const;

export const COMPANY_LOGO_MAP: Record<string, string> = {
  Advantis: "/clients/Drushti Client - Advantis.png",
  Norlanka: "/clients/Drushti Client - Norlanka.png",
  "Uber Sri Lanka": "/clients/Drushti Client - Uber.png",
  "Uber Eats": "/clients/Drushti Client - Uber Eats.png",
  "Wild Drift": "/clients/Drushti Client - Wild Drift.png",
  "Skill Gate": "/clients/Drushti Client - Skill Gate.png",
  "Skill Gate - Sri Lanka": "/clients/Drushti Client - Skill Gate.png",
  "Fairfirst Insurance Limited": "/clients/Drushti Client - Fairfirst Insurance.png",
  "Fairfirst Insurance": "/clients/Drushti Client - Fairfirst Insurance.png",
};

/** Tighter-crop logo variants used in Featured Work. */
export const FOCUSED_COMPANY_LOGO_MAP: Record<string, string> = {
  Advantis: "/clients/Drushti Client - Advantis - focused.png",
  Norlanka: "/clients/Drushti Client - Norlanka - focused.png",
  "Uber Sri Lanka": "/clients/Drushti Client - Uber - focused.png",
  "Uber Eats": "/clients/Drushti Client - Uber Eats - focused.png",
  "Wild Drift": "/clients/Drushti Client - Wild Drift - focused.png",
};

/** Featured Work logo bounds (rem — scales with root font size, not viewport). */
export const FEATURED_WORK_LOGO_MAX_HEIGHT = "3rem"; /* 48px @ 16px root — matches prior h-12 */
export const FEATURED_WORK_LOGO_MAX_WIDTH = "9.25rem"; /* 148px @ 16px root */

export function getCompanyLogo(company: string): string | undefined {
  return COMPANY_LOGO_MAP[company];
}

export function getFeaturedWorkLogo(company: string): string | undefined {
  return FOCUSED_COMPANY_LOGO_MAP[company] ?? getCompanyLogo(company);
}
