import { FounderLens } from "@/components/motion/FounderLens";
import { EvidenceLayers } from "@/components/motion/EvidenceLayers";
import { OrderedWork } from "@/components/OrderedWork";
import { Accolades } from "@/components/Accolades";

export default function Home() {
  return (
    <main id="motion-portfolio" className="pt-16">
      <h1 className="sr-only">Jackie Ng — structural biologist, ML practitioner and founder of AtomBios</h1>
      <FounderLens />
      <Accolades />
      <EvidenceLayers />
      <OrderedWork />
    </main>
  );
}
