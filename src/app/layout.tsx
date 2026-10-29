import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/LenisProvider";
import { RevealController } from "@/components/RevealController";
import { meta, navigation } from "@/lib/data";

const footerMeta = {
  email: meta.email,
  copyright: `© ${new Date().getFullYear()} Jackie Ng. All rights reserved.`,
  socialLinks: [
    { label: "LinkedIn", href: meta.socials.linkedin, icon: "linkedin" as const },
    { label: "Instagram", href: meta.socials.instagram, icon: "instagram" as const },
    { label: "GitHub", href: meta.socials.github, icon: "github" as const },
  ],
};

export const metadata: Metadata = {
  title: "Jackie Ng — Structural ML Scientist for Drug Delivery",
  description: meta.description,
  openGraph: {
    title: "Jackie Ng — Structural ML Scientist for Drug Delivery",
    description: meta.description,
    url: meta.siteUrl,
    siteName: "Jackie Ng",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jackie Ng — Structural ML Scientist for Drug Delivery",
    description: meta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ff7a1f" />
        <link rel="canonical" href={meta.siteUrl} />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=erode@400,401,500,600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: meta.name,
              jobTitle: meta.title,
              description: meta.description,
              url: meta.siteUrl,
              sameAs: [meta.socials.linkedin, meta.socials.instagram],
              worksFor: { "@type": "Organization", name: "AtomBios" },
            }),
          }}
        />
      </head>
      <body className="font-text antialiased bg-bg text-ink" style={{ fontFamily: 'var(--font-text)' }}>
        <Nav items={navigation} />
        <LenisProvider>
          {children}
        </LenisProvider>
        <Footer meta={footerMeta} />
        <RevealController />
      </body>
    </html>
  );
}
