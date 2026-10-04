import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { DeliveryGap } from "@/components/DeliveryGap";
import { Approach } from "@/components/Approach";
import { Platform } from "@/components/Platform";
import { Roadmap } from "@/components/Roadmap";
import { Founder } from "@/components/Founder";
import { Traction } from "@/components/Traction";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <DeliveryGap />
      <Approach />
      <Platform />
      <Roadmap />
      <Founder />
      <Traction />
      <Education />
      <Contact />
    </main>
  );
}
