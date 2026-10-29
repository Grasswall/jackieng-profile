import { WaterlineHero } from "@/components/sections/WaterlineHero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Flow } from "@/components/interactive/Flow";
import { Showcase } from "@/components/sections/Showcase";
import { Gallery } from "@/components/sections/Gallery";
import { Proof } from "@/components/sections/Proof";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <WaterlineHero />
      <About />
      <Stats />
      {/* Pinned pipeline, kept unchanged: cryo-EM -> 3D -> ML -> output -> validation */}
      <Flow />
      <Showcase />
      <Gallery />
      <Proof />
      <Contact />
    </main>
  );
}
