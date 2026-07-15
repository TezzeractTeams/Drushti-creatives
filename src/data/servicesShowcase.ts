export interface ServiceShowcaseItem {
  title: string;
  description: string;
  icon: "marketing" | "brand" | "graphic" | "content" | "video" | "web";
}

export const SERVICES_SHOWCASE: ServiceShowcaseItem[] = [
  {
    title: "Digital & Social Media Marketing",
    description:
      "We help you reach the right people and turn them into customers. We handle everything from creating your daily posts to managing your ad campaigns, ensuring every dollar you spend helps your business grow.",
    icon: "marketing",
  },
  {
    title: "Logo Design & Brand Identity",
    description:
      "We create a professional look that fits your business perfectly. From your logo to your brand colors, we make sure you look consistent everywhere.",
    icon: "brand",
  },
  {
    title: "Graphic Design",
    description:
      "We design clear and attractive visuals for your business needs. Whether it's a company profile or a banner, we make your information easy to read and follow.",
    icon: "graphic",
  },
  {
    title: "Content Development",
    description:
      "We find the right words to explain what you do. We write clear, simple, and honest messages that help your audience trust your brand.",
    icon: "content",
  },
  {
    title: "Video Production",
    description:
      "We create high-quality videos that tell your brand's story. We use visuals and sound to grab attention and make your message stand out.",
    icon: "video",
  },
  {
    title: "Website & UI Designing",
    description:
      "We build websites that are easy for your customers to use. Our designs are clean and simple, making sure people have a great experience when they visit you online.",
    icon: "web",
  },
];
