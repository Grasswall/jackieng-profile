import { HeroV4 } from "@/components/HeroV4";
import { StoryV4 } from "@/components/StoryV4";
import { Platform } from "@/components/interactive/Platform";
import { PhotoGallery } from "@/components/interactive/PhotoGallery";
import { CoronaClasses } from "@/components/interactive/CoronaClasses";
import { SimulatedPredictor } from "@/components/interactive/SimulatedPredictor";
import { StructuralBridge } from "@/components/interactive/StructuralBridge";
import { ValidationV4 } from "@/components/ValidationV4";
import { ContactV4 } from "@/components/ContactV4";
import { meta } from "@/lib/data";

export default function Home() {
  return (
    <main>
      {/* Hero: dark charcoal with radial gradients */}
      <HeroV4 />

      {/* Story: light, includes folded-in research direction */}
      <StoryV4 />

      {/* Platform: size comparison + the two validated results, merged */}
      <Platform />

      {/* Protein corona cryo-EM 2D classes */}
      <CoronaClasses />

      {/* Bridge: cryo-EM corona to the simulated model */}
      <StructuralBridge />

      {/* Simulation (pre-rendered Manim) */}
      <SimulatedPredictor />

      {/* Photo gallery */}
      <PhotoGallery />

      {/* Validation: dark navy */}
      <ValidationV4 />

      {/* Contact: dark navy */}
      <ContactV4 email={meta.email} />
    </main>
  );
}
