import { EditorialHero } from "@/components/EditorialHero";
import { StoryStage } from "@/components/StoryStage";
import { ProofStrip } from "@/components/ProofStrip";
import { Combination } from "@/components/Combination";
import { Vision } from "@/components/Vision";
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
      <StoryStage />
      <Combination />
      <Vision />
      <PhotoGallery />
      <ValidationV4 />
      <ContactV4 email={meta.email} />
    </main>
  );
}
