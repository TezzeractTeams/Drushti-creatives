// Featured-work case studies shown in src/sections/FeaturedWork.tsx

export interface ProjectResult {
  metric?: string;
  text: string;
}

export interface StrategyPoint {
  title: string;
  text: string;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  image: string;
  challenge: string;
  /** Optional — only populated for case studies with a full write-up. */
  strategy?: {
    intro: string;
    points?: StrategyPoint[];
  };
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
    href: "/work/advantis",
  },
  {
    name: "Norlanka | Organic Advocacy & Employer Branding",
    description:
      "Organic advocacy and employer branding for Norlanka — building community awareness and attracting the right talent through authentic content.",
    tags: ["Social Media Design", "Employer Branding", "Content Creation"],
    image: "/work/norlanka.webp",
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
    href: "/work/norlanka",
  },
  {
    name: "Uber Sri Lanka | Driver Onboarding Campaign",
    description:
      "Driver onboarding campaign for Uber Sri Lanka — reducing cost per result while increasing inquiry rates across driver and rider segments.",
    tags: ["Digital Advertising", "Driver Onboarding", "Social Media Marketing"],
    image: "/work/softlogic.webp",
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
    href: "/work/uber-sri-lanka",
  },
  {
    name: "Uber Eats | Rider Onboarding Campaign",
    description:
      "Rider onboarding campaign for Uber Eats — expanding the local delivery rider network with highly targeted, local communication.",
    tags: ["Digital Advertising", "Lead Generation", "Social Media Marketing"],
    image: "/work/ginger-fresh.webp",
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
    href: "/work/uber-eats",
  },
  {
    name: "Wild Drift | Humanizing Experiential Learning",
    description:
      "Social content for Wild Drift — establishing a trusted authority in experiential learning and driving B2B lead generation.",
    tags: ["Social Media Design", "Content Creation", "B2B Marketing"],
    image: "/work/fairfirst.webp",
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
    href: "/work/wild-drift",
  },
];
