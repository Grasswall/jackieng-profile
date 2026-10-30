import { FounderLens } from "@/components/motion/FounderLens";
import { EvidenceLayers } from "@/components/motion/EvidenceLayers";
import { WorkIndex } from "@/components/motion/WorkIndex";

export default function Home() {
  return (
    <main id="motion-portfolio" className="pt-16">
      <h1 className="sr-only">Jackie Ng — structural biologist and founder of AtomBios</h1>
      <FounderLens />
      <EvidenceLayers />
      <WorkIndex />
    </main>
  );
}
