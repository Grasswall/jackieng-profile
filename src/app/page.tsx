import { FounderLens } from "@/components/motion/FounderLens";
import { EvidenceLayers } from "@/components/motion/EvidenceLayers";
import { ResearchFit } from "@/components/ResearchFit";
import { Accolades } from "@/components/Accolades";
import { MLPipeline } from "@/components/MLPipeline";

export default function Home() {
  return (
    <main id="motion-portfolio" className="pt-16">
      <h1 className="sr-only">Jackie Ng — structural biologist, ML practitioner and founder of AtomBios</h1>
      <FounderLens />
      <ResearchFit />
      <EvidenceLayers />
      <MLPipeline />
      <Accolades />
    </main>
  );
}
