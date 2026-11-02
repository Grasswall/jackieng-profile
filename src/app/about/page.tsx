import type { Metadata } from "next";
import { Education } from "@/components/Education";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "About — Jackie Ng",
  description: "Technical translator connecting structural biology, data collection and architecture design for protein ML in drug delivery. PhD student at PolyU and founder of AtomBios.",
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
    <main className="min-h-screen bg-cream pt-28 text-ink md:pt-36">
      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-12 md:pb-28">
        <SectionLabel label="About" />
        <TextReveal as="h1" className="mb-14 mt-8 max-w-[14ch] font-heading text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
          {`Structural biology.\nDelivery in practice.`}
        </TextReveal>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <p className="max-w-[52ch] text-lg leading-[1.65] text-ink md:text-xl">
            I am a technical translator. Experimental structural biology is my foundation: resolving molecular architecture with cryo-EM and interpreting the resulting models. That background informs the biological questions I bring to computational design.
          </p>
          <p className="max-w-[52ch] text-lg leading-[1.65] text-ink md:text-xl">
            I am a PhD student at PolyU and founder of AtomBios, where my work includes data collection and model architecture for protein ML design in drug delivery. I am interested in research roles and collaborations connecting structural biology and protein ML, with drug delivery as my application focus.
          </p>
        </div>
      </div>

      <Education items={educationItems} />
    </main>
  );
}
