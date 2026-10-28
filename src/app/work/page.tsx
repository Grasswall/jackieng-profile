import type { Metadata } from "next";
import { AtomBios } from "@/components/AtomBios";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "Work — Jackie Ng",
  description: "AtomBios: 20nm nanoparticles engineered to cross the blood-brain barrier. HKSTP incubated, competition-validated, investor-backed.",
};

const pillars = [
  { icon: "⬡", title: "20nm Platform", description: "Nanoparticles 4-5× smaller than conventional LNPs, built from structural biology insight into endosomal transcytosis." },
  { icon: "⚡", title: "Validated In Vivo", description: "8× blood-brain barrier transcytosis and 3.2-fold brain accumulation versus conventional LNPs." },
  { icon: "◎", title: "Pharma Partnership", description: "Working with Sirnaomics." },
];

const badges = ["HKSTP Ideation Approved", "PolyU IEP Incubatee", "MicroFund 25/26", "JoinCap Investment Secured"];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-offwhite pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel label="Work" />
        <TextReveal as="h1" className="font-heading text-5xl md:text-6xl text-navy mt-8 mb-16 leading-tight">
          {`Small enough to cross,
proven that it works.`}
        </TextReveal>
      </div>

      <AtomBios
        heading="Nanoparticles that reach the brain."
        tagline="Conventional LNPs are too large to cross the blood-brain barrier efficiently. The 20nm platform is built from structural biology insight into endosomal transcytosis, not trial-and-error lipid screening."
        description=""
        pillars={pillars}
        programBadges={badges}
        headshot="/jackieng-profile/assets/headshot.jpg"
      />

      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionLabel label="Publication" />
        <div className="mt-8 p-8 bg-navy rounded-2xl">
          <p className="text-gold font-body text-sm tracking-wider uppercase mb-2">Journal of Biological Chemistry</p>
          <h3 className="font-heading text-2xl text-offwhite mb-4">Published Research</h3>
          <p className="text-slate leading-relaxed">
            Tang et al. — Novel host cell factors interacting with SARS-CoV-2 spike protein RBD.
            One of the world&apos;s top-10 biochemistry journals by impact factor.
          </p>
        </div>
      </section>
    </main>
  );
}
