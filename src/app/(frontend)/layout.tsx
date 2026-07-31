import type { Metadata } from "next";
import {
  ACTIVE_FONT_SYSTEM,
  fontVariables,
  getFontSystemCssVars,
  headingGoogleFontsUrl,
} from "@/config/fonts";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drushti Creatives",
  description:
    "Drushti Creatives is a marketing agency built on vision — seeing what others miss, and giving brands clarity of perspective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontSystemCssVars = getFontSystemCssVars();

  return (
    <html
      lang="en"
      className={fontVariables}
      data-font-system={ACTIVE_FONT_SYSTEM}
      style={fontSystemCssVars}
    >
      <head>
        {headingGoogleFontsUrl ? (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href={headingGoogleFontsUrl} rel="stylesheet" />
          </>
        ) : null}
      </head>
      <body className="bg-white font-body text-base text-ink antialiased">
        <SmoothScroll />
        <CustomCursor />
        <Header />
        {/* z-10 wrapper keeps all page content painting above the pinned
            footer so it stays hidden until the CTA sheet lifts away. */}
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
