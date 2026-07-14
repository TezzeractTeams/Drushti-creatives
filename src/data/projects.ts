// Featured-work case studies shown in src/sections/FeaturedWork.tsx

export interface ProjectResult {
  metric?: string;
  text: string;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  image: string;
  challenge: string;
  results: ProjectResult[];
  /** Case-study page for this project */
  href: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Advantis Project Logistics | Building B2B Authority",
    description:
      "Strategic LinkedIn and Facebook management for Advantis Project Logistics — building B2B authority through consistent, trust-based organic engagement.",
    tags: ["Social Media Design", "Content Creation", "Digital Advertising"],
    image: "/work/advantis.webp",
    challenge:
      "Advantis Project Logistics needed to move beyond basic social media presence and strategically manage their LinkedIn and Facebook",
    results: [
      { metric: "2x", text: "Growth in Facebook page following." },
      { metric: "25%", text: "Growth in LinkedIn followers." },
      {
        text: "Established Industry Authority through consistent, trust-based organic engagement.",
      },
    ],
    href: "/work/advantis",
  },
  {
    name: "Norlanka | Organic Advocacy & Employer Branding",
    description:
      "Organic advocacy and employer branding for Norlanka — building community awareness and attracting the right talent through authentic content.",
    tags: ["Social Media Design", "Employer Branding", "Content Creation"],
    image: "/work/norlanka.webp",
    challenge:
      "Norlanka aimed to build organic awareness within the local community, specifically to attract the right talent for their",
    results: [
      { metric: "12%", text: "Organic Follower Growth on LinkedIn." },
      { metric: "3x", text: "Engagement Rate Increase." },
      {
        text: "Rise in Job Inquiries, directly fulfilling the goal of attracting talent through trust and authenticity.",
      },
    ],
    href: "/work/norlanka",
  },
  {
    name: "Uber Sri Lanka | Driver Onboarding Campaign",
    description:
      "Driver onboarding campaign for Uber Sri Lanka — reducing cost per result while increasing inquiry rates across driver and rider segments.",
    tags: ["Digital Advertising", "Driver Onboarding", "Social Media Marketing"],
    image: "/work/softlogic.webp",
    challenge:
      "The objective was to onboard driver partners to the Uber rider network. While initial advertising was managed by",
    results: [
      { metric: "40%", text: "Reduction in cost per results." },
      { text: "Increased Inquiry Rate across both driver and rider segments." },
      {
        text: "High Brand Awareness established among the specific target audiences regarding the opportunity.",
      },
    ],
    href: "/work/uber-sri-lanka",
  },
  {
    name: "Uber Eats | Rider Onboarding Campaign",
    description:
      "Rider onboarding campaign for Uber Eats — expanding the local delivery rider network with highly targeted, local communication.",
    tags: ["Digital Advertising", "Lead Generation", "Social Media Marketing"],
    image: "/work/ginger-fresh.webp",
    challenge:
      "Uber Eats needed to expand its local delivery rider network. Their existing campaigns, managed by a regional team",
    results: [
      { metric: "75%", text: "Reduction in Cost Per Lead (CPL)." },
      { metric: "25%", text: "Increase in lead-to-conversion ratio." },
      { text: "Optimized ROAS through highly targeted, local communication." },
    ],
    href: "/work/uber-eats",
  },
  {
    name: "Wild Drift | Humanizing Experiential Learning",
    description:
      "Social content for Wild Drift — establishing a trusted authority in experiential learning and driving B2B lead generation.",
    tags: ["Social Media Design", "Content Creation", "B2B Marketing"],
    image: "/work/fairfirst.webp",
    challenge:
      "Wild Drift needed to move beyond a basic online presence to establish themselves as a trusted authority in",
    results: [
      { metric: "80%", text: "increase in organic page reach." },
      { metric: "50%", text: "boost in page visits through interactive and engaging content." },
      {
        text: "Generating B2B new leads, delivering a more efficient path for business growth.",
      },
    ],
    href: "/work/wild-drift",
  },
];
