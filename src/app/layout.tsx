import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { meta, navigation } from "@/lib/data";

const footerMeta = {
  email: meta.email,
  copyright: `© ${new Date().getFullYear()} Jackie Ng — The Invisible Architect. All rights reserved.`,
  socialLinks: [
    { label: "LinkedIn", href: meta.socials.linkedin, icon: "linkedin" as const },
    { label: "Instagram", href: meta.socials.instagram, icon: "instagram" as const },
    { label: "GitHub", href: meta.socials.github, icon: "github" as const },
  ],
};

export const metadata: Metadata = {
  title: "Jackie Ng — The Invisible Architect",
  description: meta.description,
  openGraph: {
    title: "Jackie Ng — The Invisible Architect",
    description: meta.description,
    url: meta.siteUrl,
    siteName: "Jackie Ng",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jackie Ng — The Invisible Architect",
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
        <meta name="theme-color" content="#0A1828" />
        <link rel="canonical" href={meta.siteUrl} />
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
      <body className="font-body antialiased bg-offwhite text-navy">
        <Nav items={navigation} />
        {children}
        <Footer meta={footerMeta} />
      </body>
    </html>
  );
}
