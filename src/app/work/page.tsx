import type { Metadata } from "next";
import { AtomBios } from "@/components/AtomBios";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "Work — Jackie Ng",
  description: "My work at AtomBios: cryo-EM structural biology, training ML models for LNP design, and a 20nm brain-delivery platform.",
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
          {`I turn structural insight\ninto delivery.`}
        </TextReveal>
      </div>

      <section aria-labelledby="contribution-heading" className="mx-auto max-w-6xl px-6 pb-16 md:px-12">
        <h2 id="contribution-heading" className="font-heading text-4xl font-semibold md:text-5xl">The work behind the profile.</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <article className="border-t border-ink/30 pt-5">
            <p className="text-sm text-stone">01 · Structural biology</p>
            <h3 className="mt-3 font-heading text-3xl">Five structures solved.</h3>
            <p className="mt-4 leading-relaxed">I solved five cryo-EM structures, with a best resolution of 2.7 Å. This is the technical foundation of my work: resolving molecular architecture and interpreting what it means biologically.</p>
            <p className="mt-4 text-sm text-stone">Cryo-EM projects are in progress; these are not five published papers.</p>
          </article>
          <article className="border-t border-ink/30 pt-5">
            <p className="text-sm text-stone">02 · Machine learning</p>
            <h3 className="mt-3 font-heading text-3xl">I train the models.</h3>
            <p className="mt-4 leading-relaxed">I train machine-learning models for lipid nanoparticle design at AtomBios. This is my hands-on contribution, alongside structural biology and experimental delivery work.</p>
          </article>
          <article className="border-t border-ink/30 pt-5">
            <p className="text-sm text-stone">03 · Drug delivery</p>
            <h3 className="mt-3 font-heading text-3xl">A 20 nm platform.</h3>
            <p className="mt-4 leading-relaxed">At AtomBios, my delivery work connects molecular insight with nanoparticle formulation. The platform reports 8× BBB transcytosis and 3.2-fold brain accumulation versus conventional LNPs.</p>
            <p className="mt-4 text-sm text-stone">Platform results describe preclinical delivery performance.</p>
          </article>
          <article className="border-t border-ink/30 pt-5">
            <p className="text-sm text-stone">04 · Company building</p>
            <h3 className="mt-3 font-heading text-3xl">Research into AtomBios.</h3>
            <p className="mt-4 leading-relaxed">As founder, I carry the scientific story into funding, partnerships and pitching. AtomBios has HK$7.05M in funding, including HK$6M through HKSTP Incu-Bio.</p>
            <a href="mailto:jackie.ng@atombios.com?subject=Research%20experience%20and%20CV" className="mt-4 inline-flex min-h-11 items-center underline underline-offset-4">Request my CV and discuss the work ↗</a>
          </article>
        </div>
      </section>

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
