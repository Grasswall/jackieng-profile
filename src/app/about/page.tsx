import type { Metadata } from "next";
import { Education } from "@/components/Education";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "About — Jackie Ng",
  description: "From First Class Honours at HKUST to structural biology research at PolyU, founding AtomBios, and affiliations with the Nobel Foundation, Shaw Prize, and CAS.",
};

const educationItems = [
  {
    degree: "MPhil",
    field: "Biochemistry",
    institution: "The Hong Kong Polytechnic University",
    years: "2023–present",
    highlights: [
      "Cryo-EM structural biology & computational drug discovery",
      "Research Postgraduate Scholarship + HK$25k Conference Grant",
      "YDC Youth Ambassadors Programme",
    ],
    tags: ["Cryo-EM", "Drug Discovery", "Best Oral Presentation"],
  },
  {
    degree: "BSc",
    field: "Biochemistry & Cell Biology",
    institution: "The Hong Kong University of Science and Technology",
    years: "2019–2023",
    highlights: [
      "First Class Honours · MCGA 4.006 · 7× Dean's List",
      "MTR Corporation Scholarship, D.H. Chen Foundation Scholarship, AEON Credit Scholarship",
      "Kitchell Undergraduate Research Award",
    ],
    tags: ["First Class Honours", "7× Dean's List", "UROP Research"],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-offwhite pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel label="About" />
        <TextReveal as="h1" className="font-heading text-5xl md:text-6xl text-navy mt-8 mb-12 leading-tight">
          {`Where the atom meets
the brain — bridging molecular
science and human impact.`}
        </TextReveal>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <p className="text-slate leading-relaxed">
            From First Class Honours at HKUST to published research in the Journal of Biological Chemistry, every step has been about turning atomic-scale insight into real-world tools. My MPhil at PolyU focuses on cryo-EM structural biology and computational drug discovery.
          </p>
          <p className="text-slate leading-relaxed">
            I founded AtomBios to bring molecular simulation to pharma speed — making the invisible architecture of life legible, actionable, and beautiful. Affiliated with the Nobel Foundation, the Shaw Prize, and the Chinese Academy of Sciences.
          </p>
        </div>

        <Education items={educationItems} />
      </div>
    </main>
  );
}
