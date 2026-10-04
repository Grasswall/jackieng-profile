import type { Metadata } from "next";
import { Education } from "@/components/Education";

export const metadata: Metadata = {
  title: "About — Jackie Ng",
  description: "Structural biologist and founder building the first foundation model for rational drug delivery design.",
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className="container">
        <h1 className="section-heading">About</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
        }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Every protein is a compressed algorithm. Evolution ran the optimisation for billions
            of years — I use cryo-EM to read the output. Not a static picture: a conformational
            ensemble that shows which states the protein actually visits.
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            That ground truth feeds AI screening: LNP-drug compatibility, binding energy landscapes,
            candidate ranking — all computed before a single compound is synthesised. The result is
            AtomBios: the vehicle that takes what the algorithm finds and puts it into a drug
            team&apos;s hands.
          </p>
        </div>
      </div>

      <Education />
    </main>
  );
}
