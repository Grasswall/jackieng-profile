import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/LenisProvider";
import { meta, navigation } from "@/lib/data";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Jackie Ng — Building the Foundation Model for Drug Delivery",
  description: "The best drugs already exist. They just can't get where they need to go. AtomBios · 20nm Endosome Platform · HKSTP Incu-Bio.",
  openGraph: {
    title: "Jackie Ng — Building the Foundation Model for Drug Delivery",
    description: "The best drugs already exist. They just can't get where they need to go. AtomBios · 20nm Endosome Platform · HKSTP Incu-Bio.",
    url: meta.siteUrl,
    siteName: "Jackie Ng",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jackie Ng — Building the Foundation Model for Drug Delivery",
    description: "The best drugs already exist. They just can't get where they need to go. AtomBios · 20nm Endosome Platform · HKSTP Incu-Bio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="color-scheme" content="dark light" />
        <link rel="canonical" href={meta.siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: meta.name,
              jobTitle: "Founder & CEO, AtomBios — Drug Delivery Platform",
              description: "Structural biologist and founder building the first foundation model for rational drug delivery design.",
              url: meta.siteUrl,
              email: meta.email,
              sameAs: [meta.socials.linkedin],
              worksFor: { "@type": "Organization", name: "AtomBios" },
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)' }}>
        <Nav items={navigation} />
        <LenisProvider>
          {children}
        </LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
