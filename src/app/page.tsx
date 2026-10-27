import { HeroV4 } from "@/components/HeroV4";
import { StoryV4 } from "@/components/StoryV4";
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

      {/* Story: dark navy */}
      <StoryV4 />

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
