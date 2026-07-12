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
    name: "Softlogic",
    description:
      "A “Fight Against Fire” brand campaign for Softlogic's fire detection systems — brochure design, system-design diagrams, and a bold shield identity that makes safety feel approachable.",
    tags: ["Brochure Design", "Brand Identity", "Print Collateral"],
    image: "/work/softlogic.webp",
    // TODO: replace placeholder challenge/results with real case-study copy
    challenge:
      "Softlogic needed its fire detection systems to feel approachable without losing technical authority across its printed collateral.",
    results: [
      { metric: "1x", text: "Placeholder result — replace with real metric." },
      { metric: "10%", text: "Placeholder result — replace with real metric." },
      { text: "Placeholder outcome statement — replace with real result." },
    ],
    href: "/work/softlogic",
  },
  {
    name: "Ginger Fresh",
    description:
      "Can packaging design for Ginger Fresh, a beverage brand built around bold contrast and refreshment — two variants sharing one confident identity.",
    tags: ["Packaging Design", "Brand Identity", "Product Design"],
    image: "/work/ginger-fresh.webp",
    // TODO: replace placeholder challenge/results with real case-study copy
    challenge:
      "Ginger Fresh needed packaging bold enough to stand out on shelf while keeping two product variants under one identity.",
    results: [
      { metric: "1x", text: "Placeholder result — replace with real metric." },
      { metric: "10%", text: "Placeholder result — replace with real metric." },
      { text: "Placeholder outcome statement — replace with real result." },
    ],
    href: "/work/ginger-fresh",
  },
  {
    name: "Norlanka",
    description:
      "Ongoing social media and employer-branding content for Norlanka — hiring campaigns, award features, festival greetings, and the “HERIZON” women-in-leadership initiative.",
    tags: ["Social Media Design", "Employer Branding", "Content Creation"],
    image: "/work/norlanka.webp",
    // TODO: replace placeholder challenge/results with real case-study copy
    challenge:
      "Norlanka needed a consistent employer-brand voice across hiring campaigns, award features, and initiatives like HERIZON.",
    results: [
      { metric: "12%", text: "Organic Follower Growth on LinkedIn." },
      { metric: "3x", text: "Engagement Rate Increase." },
      { text: "Rise in Job Inquiries, directly fulfilling the goal of attracting talent through trust and authenticity." },
    ],
    href: "/work/norlanka",
  },
  {
    name: "Fairfirst Insurance",
    description:
      "Product brochure design for Fairfirst's Smart House Insurance — translating a technical policy into a clear, homeowner-friendly story.",
    tags: ["Brochure Design", "Print Collateral", "Brand Identity"],
    image: "/work/fairfirst.webp",
    // TODO: replace placeholder challenge/results with real case-study copy
    challenge:
      "Fairfirst needed its Smart House Insurance policy translated into a story homeowners could actually understand.",
    results: [
      { metric: "1x", text: "Placeholder result — replace with real metric." },
      { metric: "10%", text: "Placeholder result — replace with real metric." },
      { text: "Placeholder outcome statement — replace with real result." },
    ],
    href: "/work/fairfirst",
  },
  {
    name: "Advantis",
    description:
      "Social content for Advantis Project Logistics — sustainability messaging, hiring campaigns, and equipment promotion for a heavy-logistics audience.",
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
];
