import type { Metadata } from "next";
import { AtomBios } from "@/components/AtomBios";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "Work — Jackie Ng",
  description: "AtomBios: explore a protein's energy landscape in hours instead of weeks. Built from cryo-EM ground truth, validated by AI screening.",
};

const pillars = [
  { icon: "⬡", title: "Ground Truth First", description: "Every model starts from a cryo-EM structure we solved. No homology models, no assumptions — real atomic coordinates from real samples." },
  { icon: "⚡", title: "Search, Not Screen", description: "Drug discovery reframed as a combinatorial search problem. LNP-drug compatibility tested across thousands of candidates before any wet experiment." },
  { icon: "◎", title: "Decisions, Not Data", description: "The output is an actionable shortlist, not a raw simulation dump. Built for the scientists and investors who have to act on what the algorithm finds." },
];

const badges = ["HKSTP Ideation Approved", "PolyU IEP Incubatee", "MicroFund 25/26", "JoinCap Investment Secured"];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-offwhite pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel label="Work" />
        <TextReveal as="h1" className="font-heading text-5xl md:text-6xl text-navy mt-8 mb-16 leading-tight">
          {`The algorithm is already in the molecule.
I built tools to read it.`}
        </TextReveal>
      </div>

      <AtomBios
        heading="Explore a protein’s energy landscape in hours instead of weeks."
        tagline="Every drug team I talked to had the same problem. They could see the structure. They knew the pocket. But they couldn't find out which molecule actually fits — not without months of specialist simulation setup."
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
