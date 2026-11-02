import Link from 'next/link'
import { FounderLens } from '@/components/motion/FounderLens'
import { EvidenceLayers } from '@/components/motion/EvidenceLayers'
import { Accolades } from '@/components/Accolades'
import './compact-home.css'

export default function Home() {
  return (
    <main className="compact-home pt-16">
      <h1 className="sr-only">Jackie Ng · Cryo-EM structural biologist · ML for drug delivery</h1>
      <FounderLens />
      <section className="visual-proof-strip" aria-label="Structural research records">

        <div className="compact-proofline">
          <p><strong>5 structures solved</strong><span>Best resolution 2.7 Å · publication in progress</span></p>
          <p><strong>Public structural records</strong><span><a href="https://www.rcsb.org/structure/9X3T">9X3T ↗</a> · <a href="https://www.rcsb.org/structure/9X3V">9X3V ↗</a> · separate from the 2.7 Å result</span></p>
          <p><strong>JBC · 2024</strong><span><a href="https://doi.org/10.1016/j.jbc.2024.107390">Co-authored research ↗</a></span></p>
        </div>
      </section>
      <EvidenceLayers />
      <section id="work-index" className="compact-work" aria-labelledby="work-heading">
        <div className="compact-section-head"><h2 id="work-heading">Where I apply it.</h2><Link className="compact-link" href="/research">Explore the research ↗</Link></div>
        <div className="compact-work-grid">
          <article className="compact-project compact-ml">
            <div className="compact-project-copy"><p className="compact-kicker">Computational work</p><h3>Train models for LNP design.</h3><p>My contribution at AtomBios. The public demo makes the data → model → output inspectable.</p><Link className="compact-link" href="/research#ml-pipeline">Open the ML pipeline ↗</Link></div>
            <div className="compact-mini-pipeline" aria-label="Public synthetic demo: formulation features to neural network to four organ classes">
              <div><strong>Inputs</strong><span>Size · SORT<br />ApoE · PEG</span></div><b aria-hidden="true">→</b><div className="compact-nodes"><strong>7 → 16 → 4</strong><span>Neural network</span></div><b aria-hidden="true">→</b><div><strong>Output</strong><span>4 organ<br />classes</span></div>
            </div>
            <p className="compact-caption">Synthetic demo, not the private AtomBios model or experimental validation.</p>
          </article>
          <article className="compact-project compact-company">
            <div className="compact-project-copy"><p className="compact-kicker">Application · founder</p><h3>Build around brain delivery.</h3><p>At AtomBios, the research has a concrete focus: lipid nanoparticles for brain delivery.</p><Link className="compact-link" href="/work">The company &amp; team results ↗</Link></div>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/jackieng-profile/images/gallery/suzhou-pitch.jpg" alt="AtomBios presentation at the Suzhou competition" loading="lazy" width="640" height="420" />
              <figcaption>HK$7.05M in company funding · not a personal grant</figcaption>
            </figure>
          </article>
        </div>
      </section>
      <Accolades compact />
    </main>
  )
}
