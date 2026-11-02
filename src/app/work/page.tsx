import type { Metadata } from 'next'
import Link from 'next/link'
import { meta } from '@/lib/data'

export const metadata: Metadata = { title: 'Research & contributions — Jackie Ng', description: 'Cryo-EM structural work, hands-on model training for LNP design and the evidence behind the research direction.' }
export default function WorkPage() {
  return <main className="min-h-screen bg-cream px-6 pb-20 pt-28 text-ink md:px-12 md:pt-36">
    <div className="mx-auto max-w-5xl">
      <Link href="/" className="inline-flex min-h-11 items-center underline">← Overview</Link>
      <h1 className="mt-6 font-heading text-5xl md:text-7xl">Technical translation.<br />Biology into design.</h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed">I translate my structural-biology background into data collection and model architecture for protein ML design in drug delivery. At AtomBios, I work across the biological question and computational implementation.</p>
      <section className="mt-14" aria-labelledby="structural-contribution"><h2 id="structural-contribution" className="font-heading text-4xl">Structural work you can inspect.</h2>
        <p className="mt-5 max-w-2xl leading-relaxed">My cryo-EM work includes reconstruction and atomic modelling, with a best resolution of 2.7 Å. That result is publication in progress, separate from the public flagellar records linked here.</p>
        <div className="mt-4 flex flex-wrap gap-6"><a className="inline-flex min-h-11 items-center underline" href="https://www.rcsb.org/structure/9X3T">PDB 9X3T ↗</a><a className="inline-flex min-h-11 items-center underline" href="https://www.rcsb.org/structure/9X3V">PDB 9X3V ↗</a></div>
      </section>
      <section className="mt-12" aria-labelledby="model-contribution"><h2 id="model-contribution" className="font-heading text-4xl">Data collection and architecture design.</h2><p className="mt-5 max-w-2xl leading-relaxed">My work includes collecting data and designing model architectures for protein ML in drug delivery. Private AtomBios architecture and dataset details are not disclosed. The public demonstration illustrates implementation on synthetic data; it does not consume my cryo-EM images or establish experimental delivery performance.</p><Link className="mt-3 inline-flex min-h-11 items-center underline" href="/research">Explore the structural visuals &amp; public model ↗</Link></section>
      <section className="mt-12" aria-labelledby="delivery-reference"><h2 id="delivery-reference" className="font-heading text-4xl">A literature-grounded delivery direction.</h2><p className="mt-5 max-w-2xl leading-relaxed">AtomBios builds on the BBB-crossing LNP approach reported by Wang et al., Nature Materials (2025). Their Figure 4b is third-party experimental evidence, not an AtomBios experiment or a matched validation of an AtomBios prediction.</p><a className="mt-3 inline-flex min-h-11 items-center underline" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12514551/figure/F4/">Inspect the published figure ↗</a></section>
      <section className="mt-12" aria-labelledby="published-work"><h2 id="published-work" className="font-heading text-4xl">Co-authored research.</h2><a href="https://doi.org/10.1016/j.jbc.2024.107390" className="mt-4 inline-flex min-h-11 items-center underline">SARS-CoV-2 spike RBD · JBC 2024 ↗</a></section>
      <a href={`mailto:${meta.email}?subject=Research%20role%20or%20collaboration`} className="mt-12 inline-flex min-h-12 items-center bg-deep px-6 py-3 text-cream">Discuss a role or collaboration ↗</a>
    </div>
  </main>
}
