import { HeroV4 } from "@/components/HeroV4";
import { StoryV4 } from "@/components/StoryV4";
import { StatsStrip } from "@/components/interactive/StatsStrip";
import { SizeComparison } from "@/components/interactive/SizeComparison";
import { PhotoGallery } from "@/components/interactive/PhotoGallery";
import { InVivoProofs } from "@/components/interactive/InVivoProofs";
import { CoronaClasses } from "@/components/interactive/CoronaClasses";
import { SimulatedPredictor } from "@/components/interactive/SimulatedPredictor";
import { StructuralBridge } from "@/components/interactive/StructuralBridge";
import { ResearchDirections } from "@/components/ResearchDirections";
import { ValidationV4 } from "@/components/ValidationV4";
import { SelectedWorkV4 } from "@/components/SelectedWorkV4";
import { ContactV4 } from "@/components/ContactV4";
import { meta } from "@/lib/data";

export default function Home() {
  return (
    <main>
      {/* Hero: dark charcoal with radial gradients */}
      <HeroV4 />

      {/* Key figures */}
      <StatsStrip />

      {/* Story: dark navy */}
      <StoryV4 />

      {/* Size Comparison: dark navy */}
      <SizeComparison />

      {/* In Vivo Proofs: dark charcoal */}
      <InVivoProofs />

      {/* Protein corona cryo-EM 2D classes */}
      <CoronaClasses />

      {/* Bridge: cryo-EM corona to the simulated model */}
      <StructuralBridge />

      {/* Simulation (pre-rendered Manim) */}
      <SimulatedPredictor />

      {/* Photo gallery */}
      <PhotoGallery />

      {/* Research Directions: dark charcoal */}
      <ResearchDirections />

      {/* Validation: dark navy */}
      <ValidationV4 />

      {/* Selected Work: dark charcoal */}
      <SelectedWorkV4 />

      {/* Contact: dark navy */}
      <ContactV4 email={meta.email} />
    </main>
  );
}
