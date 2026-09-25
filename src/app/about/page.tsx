import type { Metadata } from "next";
import { Education } from "@/components/Education";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "About — Jackie Ng",
  description: "Structural biologist turned biotech founder. Building at the intersection of atoms and algorithms.",
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
          {`I build tools that turn
atomic structures into
drug discovery decisions.`}
        </TextReveal>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <p className="text-slate leading-relaxed">
            Most drug discovery teams can see the protein structure. They know the binding pocket. But they can&apos;t test what happens when a molecule actually docks &mdash; not without six months of specialist simulation setup. That&apos;s the problem I&apos;m solving.
          </p>
          <p className="text-slate leading-relaxed">
            I founded AtomBios to compress that timeline from months to hours. Upload a structure, define a ligand, run molecular dynamics &mdash; a thousand binding modes tested before a single compound gets synthesised. The science comes from my cryo-EM research at PolyU. The platform comes from winning pitch competitions across Hong Kong, mainland China, and internationally.
          </p>
        </div>

        <Education items={educationItems} />
      </div>
    </main>
  );
}
