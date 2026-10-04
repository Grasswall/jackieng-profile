import type { Metadata } from "next";
import { Education } from "@/components/Education";

export const metadata: Metadata = {
  title: "About — Jackie Ng",
  description: "Cryo-EM structures. AI screening. AtomBios. One closed loop from atomic ground truth to clinical candidate.",
};

const educationItems = [
  {
    degree: "MPhil",
    field: "Biochemistry",
    institution: "Hong Kong Polytechnic University",
    years: "2023–present",
    highlights: [
      "Computational structural biology, cryo-EM, binding free energy calculation",
      "Research Postgraduate Scholarship + HK$25k Conference Grant",
    ],
  },
  {
    degree: "BSc",
    field: "Biochemistry & Cell Biology",
    institution: "Hong Kong University of Science and Technology",
    years: "2019–2023",
    highlights: [
      "First Class Honours · GPA 4.0 / 4.3 · Dean's List ×7",
      "MTR Corporation Scholarship, D.H. Chen Foundation Scholarship",
    ],
  },
];

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

      <Education items={educationItems} />
    </main>
  );
}
