import type { Metadata } from "next";
import { Education } from "@/components/Education";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "About — Jackie Ng",
  description: "Structural biologist turned brain-delivery scientist. Building 20nm nanoparticles that cross the blood-brain barrier.",
};

const educationItems = [
  {
    degree: "PhD",
    field: "Biochemistry",
    institution: "The Hong Kong Polytechnic University",
    years: "2023–present",
    highlights: [
      "Cryo-EM structural biology, pivoted to blood-brain barrier delivery",
      "Research Postgraduate Scholarship + HK$25k Conference Grant",
      "YDC Youth Ambassadors Programme",
    ],
    tags: ["Cryo-EM", "BBB Delivery", "Best Oral Presentation"],
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
          {`I build nanoparticles
that cross the barrier
most drugs never reach.`}
        </TextReveal>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <p className="text-slate leading-relaxed">
            The blood-brain barrier blocks most nanoparticle formulations. Conventional LNPs are too large for efficient transcytosis and too visible to immune surveillance &mdash; so CNS therapeutics that work in a dish keep failing to reach the patients who need them.
          </p>
          <p className="text-slate leading-relaxed">
            I started in structural biology, depositing cryo-EM structures at atomic resolution at PolyU. Watching exceptional CNS therapeutics fail for the same reason, again and again, is why I pivoted to delivery. AtomBios&apos;s 20nm platform is the result: validated 8&times; BBB transcytosis and 3.2-fold brain accumulation versus conventional LNPs.
          </p>
        </div>

        <Education items={educationItems} />
      </div>
    </main>
  );
}
