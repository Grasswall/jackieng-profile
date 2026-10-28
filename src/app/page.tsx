import { HeroV4 } from "@/components/HeroV4";
import { StoryV4 } from "@/components/StoryV4";
import { StatsStrip } from "@/components/interactive/StatsStrip";
import { SizeComparison } from "@/components/interactive/SizeComparison";
import { PhotoGallery } from "@/components/interactive/PhotoGallery";
import { InVivoProofs } from "@/components/interactive/InVivoProofs";
import { MLPredictor } from "@/components/interactive/MLPredictor";
import { SimulatedPredictor } from "@/components/interactive/SimulatedPredictor";
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

      {/* ML Predictor: dark charcoal */}
      <MLPredictor />

      {/* Live simulation */}
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
      <ContactV4
        email={meta.email}
        socialLinks={[
          { label: "LinkedIn", href: meta.socials.linkedin, icon: "linkedin" },
          { label: "Instagram", href: meta.socials.instagram, icon: "instagram" },
        ]}
        copyright={`© ${new Date().getFullYear()} Jackie Ng. All rights reserved.`}
      />
    </main>
  );
}
