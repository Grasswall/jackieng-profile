import { EditorialHero } from "@/components/EditorialHero";
import { ProofStrip } from "@/components/ProofStrip";
import { Vision } from "@/components/Vision";
import { FounderLens } from "@/components/motion/FounderLens";
import { EvidenceLayers } from "@/components/motion/EvidenceLayers";
import { WorkIndex } from "@/components/motion/WorkIndex";
import { Flow } from "@/components/interactive/Flow";
import { PhotoGallery } from "@/components/interactive/PhotoGallery";
import { ValidationV4 } from "@/components/ValidationV4";
import { ContactV4 } from "@/components/ContactV4";
import { meta } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <EditorialHero />
      {/* One guided flow: cryo-EM -> 3D -> ML -> output */}
      <Flow />
      <ProofStrip />
      {/* Chapters: founder (lens) -> evidence (pinned layers) -> work map. Only Flow and Evidence pin. */}
      <FounderLens />
      <EvidenceLayers />
      <WorkIndex />
      <Vision />
      <PhotoGallery />
      <ValidationV4 />
      <ContactV4 email={meta.email} />
    </main>
  );
}
