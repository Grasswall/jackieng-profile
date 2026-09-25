import type { Metadata } from "next";
import { AtomBios } from "@/components/AtomBios";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Work — Jackie Ng",
  description: "AtomBios: molecular simulation at pharma speed. Structural biology renders, publications, and molecular visualization work.",
};

const pillars = [
  { icon: "⬡", title: "Atomic Precision", description: "Structural simulation grounded in cryo-EM verified models — every binding pocket, every residue." },
  { icon: "⚡", title: "Pharma Speed", description: "Compressing the drug discovery timeline from years to weeks with GPU-accelerated molecular dynamics." },
  { icon: "◎", title: "Human Insight", description: "Translating atomic-scale data into decisions that clinicians, investors, and researchers can act on." },
];

const badges = ["HKSTP Ideation Approved", "PolyU IEP Incubatee", "MicroFund 25/26", "JoinCap Investment Secured"];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-offwhite pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel label="Work" />
        <h1 className="font-heading text-5xl md:text-6xl text-navy mt-8 mb-16 leading-tight">
          Building at the intersection<br />
          of <em>atoms</em> and <em>algorithms</em>.
        </h1>
      </div>

      <AtomBios
        heading="Molecular simulation at pharma speed."
        tagline="Founded to make the invisible architecture of life legible, actionable, and beautiful."
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
