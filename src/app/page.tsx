import Link from "next/link";
import "./motion-portfolio.css";
import { MediaSpotlight } from "@/components/MediaSpotlight";
import type { MediaEntry } from "@/components/Media";
import mediaEntries from "../../data/media.json";
import { FounderLens } from "@/components/motion/FounderLens";
import { EvidenceLayers } from "@/components/motion/EvidenceLayers";

export default function Home() {
  return (
    <main id="motion-portfolio" className="pt-16">
      <h1 className="sr-only">Jackie Ng — structural biologist and founder of AtomBios</h1>
      <FounderLens />
      <EvidenceLayers />
      <MediaSpotlight entries={mediaEntries as MediaEntry[]} />
      <section id="contact" className="unified-site !pt-0">
        <div className="u-section u-section-navy">
          <h2>Explore the work</h2>
          <div className="u-link-row">
            <Link href="/work">Structural work ↗</Link>
            <Link href="/protein-benchmark">GB1 benchmark ↗</Link>
            <a href="mailto:jackie.ng@atombios.com">Get in touch ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
