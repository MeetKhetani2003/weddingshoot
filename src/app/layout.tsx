import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-greatvibes",
});

export const metadata: Metadata = {
  title: {
    default: "The Eternal Bliss | Luxury Wedding Experiences Since 2016",
    template: "%s | The Eternal Bliss",
  },
  description:
    "The Eternal Bliss is a luxury wedding experience house — wedding planning, photography, cinematic films, decor, destination weddings, maternity and newborn photography. Creating timeless memories since 2016.",
  openGraph: {
    title: "The Eternal Bliss | Luxury Wedding Experiences",
    description:
      "Complete luxury wedding experiences — planning, decor, photography, films and celebration curation by Garima Dhingra. Since 2016.",
    type: "website",
    images: [{ url: "/12.jpg", width: 1200, height: 630 }],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Eternal Bliss",
  slogan: "Creating Timeless Memories Since 2016",
  founder: { "@type": "Person", name: "Garima Dhingra" },
  email: "hello@theeternalbliss.in",
  areaServed: "India",
  knowsAbout: [
    "Wedding Planning",
    "Wedding Photography",
    "Wedding Films",
    "Wedding Decor",
    "Destination Weddings",
    "Newborn Photography",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable}`}>
      <body className="bg-bone text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <SmoothScroll>
          <Nav />
          <main className="pb-14 md:pb-0">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
