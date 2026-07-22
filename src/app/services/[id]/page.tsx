"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Link from "next/link";

type ProcessStep = {
    step: string;
    title: string;
    description: string;
};

type FAQItem = {
    question: string;
    answer: string;
};

type ServiceDetails = {
    title: string;
    description: string;
    focus: string[];
    process: ProcessStep[];
    faqs: FAQItem[];
    bgClass: string;
    textClass: string;
};

const SERVICES_DATA: Record<string, ServiceDetails> = {
    marketing: {
        title: "Digital Marketing & Ad Management",
        description: "We take full responsibility for your brand’s online presence. From creating daily content to managing paid ad campaigns on platforms like Meta, Google, and LinkedIn, we make sure your business stays in front of the right people. We handle the strategy and the execution so your marketing works while you focus on leading.",
        focus: [
            "Reclaim Your Time: You shouldn’t have to worry about what to post or how to set up an ad.",
            "Targeted Growth: We make sure your budget is spent reaching real customers, not just getting \"likes.\"",
            "Professional Consistency: We keep your brand active and looking its best every single day.",
            "Measurable Results: We provide clear updates so you know exactly how your investment is performing."
        ],
        process: [
            { step: "01", title: "Goal Setting", description: "We discuss what you want to achieve. Whether it’s more leads or better brand awareness." },
            { step: "02", title: "Strategic Plan", description: "We identify where your customers are and create a content and ad schedule that fits." },
            { step: "03", title: "Creative Execution", description: "Our team designs the visuals, writes the copy, and sets up the campaigns." },
            { step: "04", title: "Management & Growth", description: "We monitor the results daily and adjust the strategy to keep your business growing." }
        ],
        faqs: [
            { question: "How much should I spend on ads?", answer: "We help you set a budget that fits your goals. We usually recommend starting small to see what works best, and then increasing it as we see results." },
            { question: "When will I start seeing results?", answer: "Social media growth takes time, but ads can start driving traffic within a few days. We focus on steady, long-term growth rather than overnight \"viral\" moments." },
            { question: "Do I need to provide all the photos and videos?", answer: "Not necessarily. While your own photos are great, we can create graphics, use professional stock footage, or help you plan a simple shoot to get the content we need." },
            { question: "Which platforms should my business be on?", answer: "You don’t need to be everywhere. We look at where your customers actually spend their time whether that’s Facebook, Instagram, or LinkedIn and focus our energy there." },
            { question: "How do I know if the marketing is actually working?", answer: "We provide a simple monthly update. We show you how many people reached out, how many saw your brand, and exactly where your ad budget went." }
        ],
        bgClass: "bg-blue",
        textClass: "text-white"
    },
    brand: {
        title: "Logo Design & Brand Identity",
        description: "We build a professional visual identity that reflects the quality of your business. We don't just design a logo; we create a complete brand system including colors, fonts, and styles that makes your business look established and trustworthy across all platforms.",
        focus: [
            "Instant Trust: A professional look tells customers you are serious about what you do.",
            "Stand Out: We ensure you don’t look like your competitors, but like a leader in your field.",
            "Consistency: We give you a set of rules so your brand looks the same on a business card as it does on a billboard.",
            "Long-Term Value: A well-designed identity grows with you and doesn’t go out of style."
        ],
        process: [
            { step: "01", title: "Discovery", description: "We talk about your vision and what makes your business unique." },
            { step: "02", title: "Concept Design", description: "We develop 2–3 distinct visual directions for you to review." },
            { step: "03", title: "Refine", description: "We take your feedback and polish the chosen design until it’s perfect." },
            { step: "04", title: "Brand Handoff", description: "We provide all the files and a simple guide on how to use your new look." }
        ],
        faqs: [
            { question: "How many logo options will I get to choose from?", answer: "We usually present 2 or 3 distinct directions that fit your vision. From there, we refine the one you love until it’s perfect." },
            { question: "What if I don’t like the first set of designs?", answer: "That’s why we talk so much at the start! But if we miss the mark, we include a set number of revisions to make sure the final look is exactly what you wanted." },
            { question: "Will I own the copyright to my logo?", answer: "Yes. Once the final payment is made, the logo and brand identity belong entirely to you." },
            { question: "What files will I receive?", answer: "You’ll get everything you need for print (cards, banners) and digital (social media, website), including the high-quality original files." },
            { question: "How long does the branding process take?", answer: "A full identity usually takes about 2 to 3 weeks. This gives us enough time to think, design, and get your feedback." }
        ],
        bgClass: "bg-orange",
        textClass: "text-white"
    },
    web: {
        title: "Website & UI Designing",
        description: "We build clean, modern websites that serve as a professional home for your business. Our focus is on making your site easy to navigate and mobile-friendly, ensuring that visitors can find exactly what they need and contact you without any frustration.",
        focus: [
            "Better First Impressions: Your website is often the first place a customer meets you; we make sure it’s a great meeting.",
            "Easy for Customers: We remove the confusion so people can buy from you or book your services easily.",
            "Credibility: A modern, fast website shows that your business is up-to-date and reliable."
        ],
        process: [
            { step: "01", title: "Sitemap", description: "We plan the pages and structure needed to tell your story clearly." },
            { step: "02", title: "UI Design", description: "We create a custom layout that matches your brand and feels easy to use." },
            { step: "03", title: "Development", description: "We build the site to be fast, secure, and perfect on mobile devices." },
            { step: "04", title: "Launch & Training", description: "We go live and show you how to make simple updates yourself." }
        ],
        faqs: [
            { question: "Can I update the website myself once it’s done?", answer: "Yes. We build our sites to be user-friendly. We’ll show you how to change text or images so you don’t have to call us for every small update." },
            { question: "Will my website work on mobile phones?", answer: "Absolutely. Every site we build is designed to look great and work perfectly on phones, tablets, and computers." },
            { question: "Do you handle website hosting and domains?", answer: "We can help you set them up so you own them, or we can manage them for you if you’d prefer to have everything in one place." },
            { question: "How long does it take to build a website?", answer: "A standard business site usually takes 4 to 6 weeks, depending on how much information and how many pages you need." },
            { question: "Will my website show up on Google?", answer: "We set up the basics to make sure Google can find you. For higher rankings, we can talk about a long-term plan to keep your site active and relevant." }
        ],
        bgClass: "bg-blue",
        textClass: "text-white"
    },
    video: {
        title: "Video Production/Editing",
        description: "We produce high-quality videos that capture the energy of your brand. From short social media clips to professional company profiles, we handle everything from the initial idea and filming to the final edit, making sure your message is seen and heard.",
        focus: [
            "Stop the Scroll: Video is the fastest way to grab attention in a crowded digital world.",
            "Simplify Complexity: A 60-second video can explain your business better than a long page of text.",
            "Human Connection: Video lets people see the faces and hear the voices behind your brand.",
            "Higher Engagement: People are much more likely to share and remember a video than a static image."
        ],
        process: [
            { step: "01", title: "Script & Story", description: "We outline the key message and plan the visuals we need to capture." },
            { step: "02", title: "Filming", description: "Our team handles the cameras, lighting, and sound to get high-quality footage." },
            { step: "03", title: "Post-Production", description: "We edit the video, add music, and include graphics to make it look polished." },
            { step: "04", title: "Delivery", description: "We provide the final video in the right formats for your website or social media." }
        ],
        faqs: [
            { question: "Do I need to be on camera?", answer: "Only if you want to! We can create great videos using voiceovers, text, animations, or footage of your products and team at work." },
            { question: "How long should my brand video be?", answer: "For social media, shorter is usually better—around 30 to 60 seconds. For a company profile or explainer, 2 minutes is usually the limit." },
            { question: "How long does it take to edit a video?", answer: "After filming, it usually takes us 1 to 2 weeks to handle the editing, sound, and color to get it ready for you." },
            { question: "Can you add music to my video?", answer: "Yes. We use licensed music that is safe to use on YouTube, Facebook, and Instagram so you never have to worry about copyright issues." },
            { question: "What do I need to prepare before we film?", answer: "We’ll handle the plan and the script. You just need to provide the space (if we are filming at your office) and make sure your team is ready." }
        ],
        bgClass: "bg-sky",
        textClass: "text-white"
    },
    graphic: {
        title: "Graphic Design & Content Development",
        description: "We turn your information into professional materials like company profiles, brochures, and digital reports. We combine clean design with simple, honest writing to ensure your message is easy to understand and looks high-end.",
        focus: [
            "Clear Communication: We organize your messy information into a structure that makes sense.",
            "Professionalism: High-quality brochures and profiles show that you pay attention to detail.",
            "Ease of Use: We make it easy for your sales team to share information that customers actually want to read.",
            "Unified Voice: We ensure your text and your visuals tell the same story."
        ],
        process: [
            { step: "01", title: "Content Review", description: "We look at your notes and details to find the most important points." },
            { step: "02", title: "Drafting", description: "We simplify the text and create a rough layout for the design." },
            { step: "03", title: "Creative Polish", description: "We add the visual elements and brand colors to make the document stand out." },
            { step: "04", title: "Final Files", description: "We deliver print-ready or digital files that are ready to be shared." }
        ],
        faqs: [
            { question: "Can you help with just one small project, like a flyer?", answer: "Yes. While we love building full strategies, we are happy to help with individual items like company profiles, brochures, or digital banners." },
            { question: "Do you handle the printing as well?", answer: "We handle the design and give you print-ready files. If you need a printer, we can recommend reliable ones we’ve worked with before." },
            { question: "How do I give you the information for a brochure?", answer: "You can send us your rough notes or even a voice message. We’ll take that information and rewrite it so it’s professional and easy to read." },
            { question: "Can you update my existing company profile?", answer: "Yes. We can take your current materials and give them a modern, professional look that fits your brand today." },
            { question: "How fast can I get a design done?", answer: "Small designs usually take 3 to 5 days. For larger projects like a 20-page profile, we’ll give you a specific timeline at the start." }
        ],
        bgClass: "bg-green",
        textClass: "text-white"
    }
};

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const id = typeof params.id === "string" ? params.id : "";
    const details = SERVICES_DATA[id];

    if (!details) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-ink">
                <h1 className="text-2xl font-bold mb-4">Service not found</h1>
                <Link href="/">
                    <Button variant="primary">Go Back Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-cream text-ink pt-28 pb-20 md:pt-36 md:pb-28">
            {/* Hero Section */}
            <section className={`w-full ${details.bgClass} ${details.textClass} py-16 md:py-24 rounded-[2.5rem] overflow-hidden`}>
                <Container>
                    <div className="max-w-4xl">
                        <Link href="/services" className="inline-flex items-center gap-2 mb-8 text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity">
                            ← Back to Services
                        </Link>
                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1] tracking-tight mb-8">
                            {details.title}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed opacity-90 max-w-3xl">
                            {details.description}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Our Focus Section */}
            <section className="py-16 md:py-24">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
                        <div>
                            <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight">Our Focus</h2>
                            <p className="mt-4 text-ink/65 text-sm md:text-base leading-relaxed">
                                Key values and strategic benefits we deliver under this service stream.
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {details.focus.map((item, index) => {
                                const [title, description] = item.split(": ");
                                return (
                                    <div key={index} className="bg-white p-8 rounded-3xl border border-ink/5 shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
                                        <p className="text-sm text-ink/70 leading-relaxed">{description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our Process Section */}
            <section className="py-16 md:py-24 bg-white/40 border-y border-ink/5">
                <Container>
                    <div className="mb-12 max-w-2xl">
                        <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight">Our Process</h2>
                        <p className="mt-4 text-ink/65 text-sm md:text-base leading-relaxed">
                            How we collaborate with you from discovery to management & growth.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {details.process.map((step, index) => (
                            <div key={index} className="relative bg-white p-8 rounded-3xl border border-ink/5 flex flex-col justify-between min-h-[220px]">
                                <div>
                                    <span className="block font-heading text-4xl text-ink/15 font-black mb-4">{step.step}</span>
                                    <h3 className="font-heading text-lg font-semibold mb-2">{step.title}</h3>
                                </div>
                                <p className="text-sm text-ink/70 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
                        <div>
                            <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight">Frequently Asked Questions</h2>
                            <p className="mt-4 text-ink/65 text-sm md:text-base leading-relaxed">
                                Quick answers to common queries about this service stream.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {details.faqs.map((faq, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div key={index} className="bg-white rounded-3xl border border-ink/5 overflow-hidden transition-all duration-300">
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : index)}
                                            className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 focus:outline-none"
                                        >
                                            <span className="font-heading font-medium text-base sm:text-lg text-ink">
                                                {faq.question}
                                            </span>
                                            <span className={`text-xl transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                                                +
                                            </span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 border-t border-ink/5 text-sm sm:text-base text-ink/70 leading-relaxed">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact Banner / CTA */}
            <section className="py-12 md:py-16">
                <Container>
                    <div className="bg-orange text-white rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h3 className="font-heading text-2xl md:text-3xl font-normal leading-tight mb-2">Ready to work with us?</h3>
                            <p className="opacity-90 text-sm md:text-base">Let's discuss how we can accelerate your business growth.</p>
                        </div>
                        <Link href="/contact" passHref legacyBehavior>
                            <Button variant="primary" className="!rounded-md !bg-white !text-ink hover:!bg-cream transition-colors self-start md:self-auto">
                                Let's Talk
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    );
}
