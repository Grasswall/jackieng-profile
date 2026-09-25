import type { Metadata } from "next";
import { Education } from "@/components/Education";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "About — Jackie Ng",
  description: "Cryo-EM structures. AI screening. AtomBios. One closed loop from atomic ground truth to clinical candidate.",
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
          {`Constraint satisfaction problems
optimised by evolution.
I decode them.
Then I build tools around what I find.`}
        </TextReveal>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <p className="text-slate leading-relaxed">
            Every protein is a compressed algorithm. Evolution ran the optimisation for billions of years — I use cryo-EM to read the output. Not a static picture: a conformational ensemble that shows which states the protein actually visits, which pockets open and close, and which binding modes are physically real versus theoretical.
          </p>
          <p className="text-slate leading-relaxed">
            That ground truth feeds the second loop: AI screening. LNP-drug compatibility, binding energy landscapes, candidate ranking — all computed before a single compound is synthesised. The third loop is AtomBios: the vehicle that takes what the algorithm finds and puts it into a drug team’s hands. Cryo-EM → AI screening → AtomBios. One closed loop.
          </p>
        </div>

        <Education items={educationItems} />
      </div>
    </main>
  );
}
