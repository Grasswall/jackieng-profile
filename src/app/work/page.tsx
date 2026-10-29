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
    <main className="min-h-screen bg-cream pt-28 text-ink md:pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <SectionLabel label="Work" />
        <TextReveal as="h1" className="mb-14 mt-8 max-w-[14ch] font-heading text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl md:mb-20 md:text-7xl">
          {`Small enough to cross,\nproven that it works.`}
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

      <section aria-labelledby="publication-heading" className="on-dark mt-20 bg-deep text-cream md:mt-28">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
          <SectionLabel label="Publication" lineColor="white" />
          <p className="mt-8 text-base text-mist">Journal of Biological Chemistry</p>
          <h2 id="publication-heading" className="mt-1 font-heading text-4xl font-semibold leading-tight md:text-6xl">
            Published Research
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-[1.6] text-cream md:text-xl">
            Tang et al. — Novel host cell factors interacting with SARS-CoV-2 spike protein RBD.
          </p>
        </div>
      </section>
    </main>
  );
}
