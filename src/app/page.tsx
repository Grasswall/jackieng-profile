import { FounderLens } from '@/components/motion/FounderLens'
import { DiscoveryPipeline } from '@/components/DiscoveryPipeline'
import { Accolades } from '@/components/Accolades'
import './compact-home.css'
import './visual-discovery.css'

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
      <DiscoveryPipeline />
      <Accolades compact />
    </main>
  )
}
