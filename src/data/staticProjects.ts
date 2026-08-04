import type { Project } from "@/lib/content/types";
import { projectHref } from "@/lib/content/types";
import { getStaticClientBySlug } from "@/data/staticClients";

type StaticProjectInput = Omit<
  Project,
  "client" | "clientSlug" | "clientLogoSquare" | "clientLogoFocus" | "href"
> & {
  clientSlug: string;
};

function buildProject(input: StaticProjectInput): Project {
  const client = getStaticClientBySlug(input.clientSlug);
  if (!client) {
    throw new Error(`Missing static client for slug: ${input.clientSlug}`);
  }

  return {
    ...input,
    client: client.name,
    clientSlug: client.slug,
    clientLogoSquare: client.logoSquare,
    clientLogoFocus: client.logoFocus,
    href: projectHref(input.slug),
  };
}

/** Seed / fallback portfolio data — migrated into Payload via `npm run seed`. */
export const STATIC_PROJECTS: Project[] = [
  buildProject({
    slug: "advantis",
    name: "Building B2B Authority",
    clientSlug: "advantis",
    description:
      "Strategic LinkedIn and Facebook management for Advantis Project Logistics — building B2B authority through consistent, trust-based organic engagement.",
    tags: ["Social Media Design", "Content Creation"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2023-08-12T00:00:00.000Z",
    updatedAt: "2025-06-18T00:00:00.000Z",
    featuredImage: "/work/advantis.webp",
    images: [],
    featuredOnHero: true,
    featuredOnHomepage: true,
    challenge:
      "Advantis Project Logistics needed to move beyond basic social media presence and strategically manage their LinkedIn and Facebook platforms. Their primary goal was to “strip away the noise” of a complex industry to establish real credibility and engage a professional B2B audience through organic methods. They required a partner that could articulate their vision and build trust in their ability to manage large-scale logistics projects.",
    strategy: {
      intro:
        "We acted as the creative brain for the brand, recognizing that in the high-stakes world of project logistics, trust is the only currency that matters. Our approach utilized Strategic Empathy and Adaptive Thinking to create a path forward that was 100% unique to their needs:",
      points: [
        {
          title: "Knowledge as Credibility",
          text: "Because logistics projects are long-term commitments, we implemented a strategy of sharing expert knowledge to showcase their industry leadership and project management capabilities.",
        },
        {
          title: "Showcasing Capability",
          text: "We focused on building content that highlighted their specific capacity for handling massive logistics challenges, turning “hard-to-explain” technical processes into clear, trustworthy stories.",
        },
        {
          title: "Human-Centric B2B",
          text: "We utilized Human Connections by featuring internal employee achievements and articles. This showcased the real people and expertise behind their large-scale operations.",
        },
      ],
    },
    results: [
      { metric: "2x", text: "Growth in Facebook page following." },
      { metric: "25%", text: "Growth in LinkedIn followers." },
      {
        text: "Established Industry Authority through consistent, trust-based organic engagement.",
      },
    ],
  }),
  buildProject({
    slug: "norlanka",
    name: "Organic Advocacy & Employer Branding",
    clientSlug: "norlanka",
    description:
      "Organic advocacy and employer branding for Norlanka — building community awareness and attracting the right talent through authentic content.",
    tags: ["Social Media Design", "Employer Branding"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2023-11-05T00:00:00.000Z",
    updatedAt: "2025-05-22T00:00:00.000Z",
    featuredImage: "/work/norlanka.webp",
    images: [],
    featuredOnHero: true,
    featuredOnHomepage: true,
    challenge:
      "Norlanka aimed to build organic awareness within the local community, specifically to attract the right talent for their job vacancies. The core pressure was finding a way to articulate their internal culture and build genuine trust with potential candidates through employee advocacy.",
    strategy: {
      intro:
        "To address this, we stepped into their shoes to identify the “spark” that would resonate with their audience. We moved away from standard, generic agency styles and implemented a strategy rooted in Adaptive Thinking:",
      points: [
        {
          title: "Culture-Led Content",
          text: "We used Norlanka’s actual company values to communicate their internal culture directly to their LinkedIn and Instagram communities.",
        },
        {
          title: "Authentic Uniformity",
          text: "We established a uniform communication style that showcased internal activities and cultural elements, ensuring the brand felt real and cohesive.",
        },
        {
          title: "The Creative Brain",
          text: "Rather than just “posting content,” we thought through the communication to ensure it reflected Norlanka's unique identity as an organization.",
        },
      ],
    },
    results: [
      { metric: "12%", text: "Organic Follower Growth on LinkedIn." },
      {
        metric: "3x",
        text: "Engagement Rate Increase, achieving the highest engagement rate compared to their industry competitors.",
      },
      {
        text: "Rise in Job Inquiries, directly fulfilling the goal of attracting talent through trust and authenticity.",
      },
    ],
  }),
  buildProject({
    slug: "uber-sri-lanka",
    name: "Driver Onboarding Campaign",
    clientSlug: "uber-sri-lanka",
    description:
      "Driver onboarding campaign for Uber Sri Lanka — reducing cost per result while increasing inquiry rates across driver and rider segments.",
    tags: ["Digital Advertising", "Driver Onboarding"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2024-02-20T00:00:00.000Z",
    updatedAt: "2025-04-10T00:00:00.000Z",
    featuredImage: "/work/softlogic.webp",
    images: [],
    featuredOnHero: true,
    featuredOnHomepage: true,
    challenge:
      "The objective was to onboard driver partners to the Uber rider network. While initial advertising was managed by a regional team in Singapore, the client sought a more localized approach after seeing the success of our Uber Eats delivery rider campaigns. The challenge was to move beyond generic communication and “strip away the noise” to reach specific segments effectively.",
    strategy: {
      intro:
        "We identified a significant gap in local communication and competitor behavior. Our strategy utilized Adaptive Thinking to move away from a standard “agency style” and create something 100% unique to the brand:",
      points: [
        {
          title: "Dual-Track Strategy",
          text: "We developed two distinct visual identities and tonal styles. This ensured that the branding felt personal and relevant to each specific group rather than robotic or generic.",
        },
        {
          title: "Solving the “Pain Points”",
          text: "We tailored our creative work to speak to the desire for easy supplemental jobs and quick earnings that fit around a primary career.",
        },
      ],
    },
    results: [
      { metric: "40%", text: "Reduction in cost per results." },
      { text: "Increased Inquiry Rate across both driver and rider segments." },
      {
        text: "High Brand Awareness established among the specific target audiences regarding the opportunity.",
      },
    ],
  }),
  buildProject({
    slug: "uber-eats",
    name: "Rider Onboarding Campaign",
    clientSlug: "uber-eats",
    description:
      "Rider onboarding campaign for Uber Eats — expanding the local delivery rider network with highly targeted, local communication.",
    tags: ["Digital Advertising", "Lead Generation"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2023-06-14T00:00:00.000Z",
    updatedAt: "2025-03-28T00:00:00.000Z",
    featuredImage: "/work/ginger-fresh.webp",
    images: ["/work/uber eats.png"],
    featuredOnHero: true,
    featuredOnHomepage: true,
    challenge:
      "Uber Eats needed to expand its local delivery rider network. Their existing campaigns, managed by a regional team in Singapore, lacked a “local vibe,” resulting in high lead costs and a struggle to connect with the right audience.",
    strategy: {
      intro:
        "Acting as the creative brain, we stripped away the corporate noise to find a message that resonated on the streets. Our approach utilized Strategic Empathy to turn “hard-to-explain” business goals into a simple path forward — prioritizing Real Connections over robotic content to deliver significant operational peace of mind for the client.",
    },
    results: [
      { metric: "75%", text: "Reduction in Cost Per Lead (CPL)." },
      { metric: "25%", text: "Increase in lead-to-conversion ratio." },
      { text: "Optimized ROAS through highly targeted, local communication." },
    ],
  }),
  buildProject({
    slug: "wild-drift",
    name: "Humanizing Experiential Learning",
    clientSlug: "wild-drift",
    description:
      "Social content for Wild Drift — establishing a trusted authority in experiential learning and driving B2B lead generation.",
    tags: ["Social Media Design", "B2B Marketing"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2024-09-01T00:00:00.000Z",
    updatedAt: "2025-07-15T00:00:00.000Z",
    featuredImage: "/work/fairfirst.webp",
    images: ["/work/wilddrift.png"],
    featuredOnHero: true,
    featuredOnHomepage: true,
    challenge:
      "Wild Drift needed to move beyond a basic online presence to establish themselves as a trusted authority in the outbound training industry. Their goal was to articulate their unique experiential learning offerings in a way that would genuinely attract new clients and build long-term credibility.",
    strategy: {
      intro:
        "We took full Ownership of their digital voice, moving beyond standard social media tactics to develop a direction that felt like a natural extension of the Wild Drift team. By applying Adaptive Thinking, we built a visual and tonal style that was 100% unique to their culture:",
      points: [
        {
          title: "Authentic Content Curation",
          text: "We bypassed standard posts in favor of engaging content that featured real team-building photos, client testimonials, and deep insights into the benefits of experiential learning.",
        },
        {
          title: "Knowledge-Led Trust",
          text: "We curated a mix of participant testimonials and expert insights into the science of experiential learning to establish them as reputable leaders in their field.",
        },
        {
          title: "Clarity First",
          text: "We stripped away the noise of the training industry to focus on the “spark”—the specific creative impact Wild Drift has on teams.",
        },
      ],
    },
    results: [
      { metric: "80%", text: "increase in organic page reach." },
      { metric: "50%", text: "boost in page visits through interactive and engaging content." },
      {
        text: "Generating B2B new leads, delivering a more efficient path for business growth.",
      },
    ],
  }),

  // Company profile design work — from public/Drushti Company Profile Designs.
  buildProject({
    slug: "abi-company-profile",
    name: "Abi Company Profile Design",
    clientSlug: "abi",
    description: "Company profile design for Abi — a polished, presentation-ready overview of the brand.",
    tags: ["Company Profile", "Graphic Design"],
    serviceCategory: "Logo Design & Graphic Design",
    createdAt: "2025-08-01T00:00:00.000Z",
    updatedAt: "2025-08-01T00:00:00.000Z",
    featuredImage: "/Drushti Company Profile Designs/Abi/Company Profile SM Desings-01.png",
    images: [
      "/Drushti Company Profile Designs/Abi/Company Profile SM Desings-02.png",
      "/Drushti Company Profile Designs/Abi/Company Profile SM Desings-03.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge:
      "Abi needed a clear, professional company profile that could represent the brand consistently across client-facing materials.",
    results: [{ text: "Delivered a polished, on-brand company profile ready for client-facing use." }],
  }),
  buildProject({
    slug: "ibh-company-profile",
    name: "IBH Company Profile Design",
    clientSlug: "ibh",
    description: "Company profile design for IBH — a polished, presentation-ready overview of the brand.",
    tags: ["Company Profile", "Graphic Design"],
    serviceCategory: "Logo Design & Graphic Design",
    createdAt: "2025-08-01T00:00:00.000Z",
    updatedAt: "2025-08-01T00:00:00.000Z",
    featuredImage: "/Drushti Company Profile Designs/IBH/Company Profile SM Desings-05.png",
    images: [
      "/Drushti Company Profile Designs/IBH/Company Profile SM Desings-06.png",
      "/Drushti Company Profile Designs/IBH/Company Profile SM Desings-07.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge:
      "IBH needed a clear, professional company profile that could represent the brand consistently across client-facing materials.",
    results: [{ text: "Delivered a polished, on-brand company profile ready for client-facing use." }],
  }),
  buildProject({
    slug: "mother-charitable-foundation-company-profile",
    name: "Mother Charitable Foundation Company Profile Design",
    clientSlug: "mother-charitable-foundation",
    description:
      "Company profile design for Mother Charitable Foundation — a polished, presentation-ready overview of the organization.",
    tags: ["Company Profile", "Graphic Design"],
    serviceCategory: "Logo Design & Graphic Design",
    createdAt: "2025-08-01T00:00:00.000Z",
    updatedAt: "2025-08-01T00:00:00.000Z",
    featuredImage: "/Drushti Company Profile Designs/Mother/Company Profile SM Desings-21.png",
    images: [
      "/Drushti Company Profile Designs/Mother/Company Profile SM Desings-22.png",
      "/Drushti Company Profile Designs/Mother/Company Profile SM Desings-23.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge:
      "Mother Charitable Foundation needed a clear, professional company profile that could represent the organization consistently across client-facing materials.",
    results: [{ text: "Delivered a polished, on-brand company profile ready for client-facing use." }],
  }),
  buildProject({
    slug: "om-ceylon-company-profile",
    name: "OM Ceylon Company Profile Design",
    clientSlug: "om-ceylon",
    description: "Company profile design for OM Ceylon — a polished, presentation-ready overview of the brand.",
    tags: ["Company Profile", "Graphic Design"],
    serviceCategory: "Logo Design & Graphic Design",
    createdAt: "2025-08-01T00:00:00.000Z",
    updatedAt: "2025-08-01T00:00:00.000Z",
    featuredImage: "/Drushti Company Profile Designs/OM Ceylon/Company Profile SM Desings-09.png",
    images: [
      "/Drushti Company Profile Designs/OM Ceylon/Company Profile SM Desings-10.png",
      "/Drushti Company Profile Designs/OM Ceylon/Company Profile SM Desings-11.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge:
      "OM Ceylon needed a clear, professional company profile that could represent the brand consistently across client-facing materials.",
    results: [{ text: "Delivered a polished, on-brand company profile ready for client-facing use." }],
  }),
  buildProject({
    slug: "skill-gate-company-profile",
    name: "Skill Gate Company Profile Design",
    clientSlug: "skill-gate",
    description: "Company profile design for Skill Gate — a polished, presentation-ready overview of the brand.",
    tags: ["Company Profile", "Graphic Design"],
    serviceCategory: "Logo Design & Graphic Design",
    createdAt: "2025-08-01T00:00:00.000Z",
    updatedAt: "2025-08-01T00:00:00.000Z",
    featuredImage: "/Drushti Company Profile Designs/Skill gate/Company Profile SM Desings-13.png",
    images: [
      "/Drushti Company Profile Designs/Skill gate/Company Profile SM Desings-14.png",
      "/Drushti Company Profile Designs/Skill gate/Company Profile SM Desings-15.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge:
      "Skill Gate needed a clear, professional company profile that could represent the brand consistently across client-facing materials.",
    results: [{ text: "Delivered a polished, on-brand company profile ready for client-facing use." }],
  }),
  buildProject({
    slug: "softlogic-company-profile",
    name: "Softlogic Company Profile Design",
    clientSlug: "softlogic",
    description: "Company profile design for Softlogic — a polished, presentation-ready overview of the brand.",
    tags: ["Company Profile", "Graphic Design"],
    serviceCategory: "Logo Design & Graphic Design",
    createdAt: "2025-08-01T00:00:00.000Z",
    updatedAt: "2025-08-01T00:00:00.000Z",
    featuredImage: "/Drushti Company Profile Designs/Softlogic/Company Profile SM Desings-25.png",
    images: [
      "/Drushti Company Profile Designs/Softlogic/Company Profile SM Desings-27.png",
      "/Drushti Company Profile Designs/Softlogic/Company Profile SM Desings-28.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge:
      "Softlogic needed a clear, professional company profile that could represent the brand consistently across client-facing materials.",
    results: [{ text: "Delivered a polished, on-brand company profile ready for client-facing use." }],
  }),
  buildProject({
    slug: "speak-company-profile",
    name: "Speak Company Profile Design",
    clientSlug: "speak",
    description: "Company profile design for Speak — a polished, presentation-ready overview of the brand.",
    tags: ["Company Profile", "Graphic Design"],
    serviceCategory: "Logo Design & Graphic Design",
    createdAt: "2025-08-01T00:00:00.000Z",
    updatedAt: "2025-08-01T00:00:00.000Z",
    featuredImage: "/Drushti Company Profile Designs/Speak/Company Profile SM Desings-17.png",
    images: [
      "/Drushti Company Profile Designs/Speak/Company Profile SM Desings-18.png",
      "/Drushti Company Profile Designs/Speak/Company Profile SM Desings-19.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge:
      "Speak needed a clear, professional company profile that could represent the brand consistently across client-facing materials.",
    results: [{ text: "Delivered a polished, on-brand company profile ready for client-facing use." }],
  }),

  // Social media design work — from public/Drushti Social Media.
  buildProject({
    slug: "361-degrees-social-media",
    name: "361 Degrees Social Media Design",
    clientSlug: "361-degrees",
    description: "Social media design work for 361 Degrees — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/361 Degrees/361 Degrees-03.png",
    images: [
      "/Drushti Social Media/361 Degrees/361 Degrees-04.png",
      "/Drushti Social Media/361 Degrees/361 Degrees-05.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "361 Degrees needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "afi-social-media",
    name: "AFI Social Media Design",
    clientSlug: "afi",
    description: "Social media design work for AFI — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/AFI/AFI-03.png",
    images: ["/Drushti Social Media/AFI/AFI-12.png"],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "AFI needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "aarrya-social-media",
    name: "Aarrya Social Media Design",
    clientSlug: "aarrya",
    description: "Social media design work for Aarrya — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/Aarrya/Aarrya Designs-01.png",
    images: ["/Drushti Social Media/Aarrya/Aarrya Designs-02.png"],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "Aarrya needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "advantis-social-media",
    name: "Advantis Social Media Design",
    clientSlug: "advantis",
    description: "Social media design work for Advantis — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/Advantis/Advantis-02.png",
    images: [
      "/Drushti Social Media/Advantis/Advantis-08.png",
      "/Drushti Social Media/Advantis/Advantis-09.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "Advantis needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "nlpl-social-media",
    name: "NLPL Social Media Design",
    clientSlug: "nlpl",
    description: "Social media design work for NLPL — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/NLPL/1 NLPL.png",
    images: ["/Drushti Social Media/NLPL/NLPL SM-01.png"],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "NLPL needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "oak-social-media",
    name: "OAK Social Media Design",
    clientSlug: "oak",
    description: "Social media design work for OAK — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/OAK/Oak-01.png",
    images: ["/Drushti Social Media/OAK/Oak-05.png"],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "OAK needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "semi-colon-social-media",
    name: "Semi Colon Social Media Design",
    clientSlug: "semi-colon",
    description: "Social media design work for Semi Colon — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/Semi Colon/Semicolon-01.png",
    images: ["/Drushti Social Media/Semi Colon/Semicolon-11.png"],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "Semi Colon needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "speak-social-media",
    name: "Speak Social Media Design",
    clientSlug: "speak",
    description: "Social media design work for Speak — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/Speak/Speak-01.png",
    images: [
      "/Drushti Social Media/Speak/Speak-04.png",
      "/Drushti Social Media/Speak/Speak-06.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "Speak needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "uber-eats-social-media",
    name: "Uber Eats Social Media Design",
    clientSlug: "uber-eats",
    description: "Social media design work for Uber Eats — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/Uber Eats/Uber Eats-02.png",
    images: [
      "/Drushti Social Media/Uber Eats/Uber Eats-14.png",
      "/Drushti Social Media/Uber Eats/Uber Rides-06-03.png",
    ],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "Uber Eats needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
  buildProject({
    slug: "uber-rides-social-media",
    name: "Uber Rides Social Media Design",
    clientSlug: "uber-rides",
    description: "Social media design work for Uber Rides — a cohesive set of on-brand social creatives.",
    tags: ["Social Media Design", "Graphic Design"],
    serviceCategory: "Social Media & Digital Marketing",
    createdAt: "2025-08-04T00:00:00.000Z",
    updatedAt: "2025-08-04T00:00:00.000Z",
    featuredImage: "/Drushti Social Media/Uber Rides/Uber Rides-02.png",
    images: ["/Drushti Social Media/Uber Rides/Uber Rides-04.png"],
    featuredOnHero: false,
    featuredOnHomepage: false,
    challenge: "Uber Rides needed a consistent set of social media creatives that reflected their brand identity.",
    results: [{ text: "Delivered a cohesive set of on-brand social media designs." }],
  }),
];
