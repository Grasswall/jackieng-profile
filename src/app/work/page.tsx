import type { Metadata } from "next";
import { AtomBios } from "@/components/AtomBios";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "Work — Jackie Ng",
  description: "AtomBios: the simulation platform that turns cryo-EM structures into drug candidates. HKSTP incubated, competition-validated, investor-backed.",
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
        <TextReveal as="h1" className="font-heading text-5xl md:text-6xl text-navy mt-8 mb-16 leading-tight">
          {`Building at the intersection
of atoms and algorithms.`}
        </TextReveal>
      </div>

      <AtomBios
        heading="Molecular simulation at pharma speed."
        tagline="Every drug team I talked to had the same problem. They could see the structure. They knew the pocket. But they couldn't test what happens when a molecule actually docks."
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
