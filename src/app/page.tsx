import Link from "next/link";
import "./motion-portfolio.css";
import "./speaking/media.css";
import { Media, type MediaEntry } from "@/components/Media";
import mediaEntries from "../../data/media.json";
import { FounderLens } from "@/components/motion/FounderLens";
import { EvidenceLayers } from "@/components/motion/EvidenceLayers";
import { WorkIndex } from "@/components/motion/WorkIndex";

export default function Home() {
  return (
    <main id="motion-portfolio" className="pt-16">
      <h1 className="sr-only">Jackie Ng — structural biologist and founder of AtomBios</h1>
      <FounderLens />
      <EvidenceLayers />
      <WorkIndex />
      <section id="media" className="unified-site media-page home-media" aria-labelledby="home-media-heading">
        <div className="media-intro media-frame">
          <h2 id="home-media-heading">Media &amp; speaking</h2>
          <p>Coverage, research talks and scientific exchange.</p>
        </div>
        <Media entries={mediaEntries as MediaEntry[]} />
      </section>
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
