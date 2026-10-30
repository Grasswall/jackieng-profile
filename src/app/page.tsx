import { EditorialHero } from "@/components/EditorialHero";
import { Vision } from "@/components/Vision";
import { FounderLens } from "@/components/motion/FounderLens";
import { EvidenceLayers } from "@/components/motion/EvidenceLayers";
import { WorkIndex } from "@/components/motion/WorkIndex";
import { Flow } from "@/components/interactive/Flow";
import { ValidationV4 } from "@/components/ValidationV4";
import { ContactV4 } from "@/components/ContactV4";
import { meta } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <EditorialHero />
      {/* Capability proof first; motion chapters then make each claim inspectable. */}
      <Flow />
      <FounderLens />
      <EvidenceLayers />
      <WorkIndex />
      <Vision />
      <ValidationV4 />
      <ContactV4 email={meta.email} />
    </main>
  );
}
