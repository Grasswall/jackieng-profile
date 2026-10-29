import type { Metadata } from "next";
import { Education } from "@/components/Education";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "About — Jackie Ng",
  description: "Structural biologist building ML for drug delivery. Building 20nm nanoparticles that cross the blood-brain barrier.",
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
          {`I build nanoparticles\nthat cross the barrier\nmost drugs never reach.`}
        </TextReveal>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <p className="max-w-[52ch] text-lg leading-[1.65] text-ink md:text-xl">
            The blood-brain barrier blocks most nanoparticle formulations. Conventional LNPs are too large for efficient transcytosis, so CNS therapeutics that work in a dish keep failing to reach the patients who need them.
          </p>
          <p className="max-w-[52ch] text-lg leading-[1.65] text-ink md:text-xl">
            I started in structural biology, solving cryo-EM structures at atomic resolution at PolyU, then moved into delivery. The AtomBios 20nm platform is where those two meet: 8&times; BBB transcytosis and 3.2-fold brain accumulation versus conventional LNPs.
          </p>
        </div>
      </div>

      <Education items={educationItems} />
    </main>
  );
}
