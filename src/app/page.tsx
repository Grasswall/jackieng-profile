import { HeroV4 } from "@/components/HeroV4";
import { StoryStage } from "@/components/StoryStage";
import { ProofStrip } from "@/components/ProofStrip";
import { Vision } from "@/components/Vision";
import { Flow } from "@/components/interactive/Flow";
import { PhotoGallery } from "@/components/interactive/PhotoGallery";
import { ValidationV4 } from "@/components/ValidationV4";
import { ContactV4 } from "@/components/ContactV4";
import { meta } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <HeroV4 />
      <ProofStrip />
      <StoryStage />
      {/* One guided flow: cryo-EM -> 3D -> ML -> output */}
      <Flow />
      <Vision />
      <PhotoGallery />
      <ValidationV4 />
      <ContactV4 email={meta.email} />
    </main>
  );
}
