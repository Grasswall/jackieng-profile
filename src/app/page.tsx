import { HeroV4 } from "@/components/HeroV4";
import { StoryV4 } from "@/components/StoryV4";
import { Flow } from "@/components/interactive/Flow";
import { PhotoGallery } from "@/components/interactive/PhotoGallery";
import { ValidationV4 } from "@/components/ValidationV4";
import { ContactV4 } from "@/components/ContactV4";
import { meta } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <HeroV4 />
      <StoryV4 />
      {/* One guided flow: cryo-EM -> 3D -> ML -> output */}
      <Flow />
      <PhotoGallery />
      <ValidationV4 />
      <ContactV4 email={meta.email} />
    </main>
  );
}
