import type { Metadata } from 'next'
import Link from 'next/link'
import { EvidenceLayers } from '@/components/motion/EvidenceLayers'
import { MLPipeline } from '@/components/MLPipeline'
export const metadata: Metadata = { title: 'Research & ML pipeline — Jackie Ng', description: 'Structural evidence and an interactive synthetic formulation-model demo. Separate from the private AtomBios model.' }
export default function ResearchPage() {
  return <main className="bg-cream pt-24"><div className="mx-auto max-w-6xl px-6 pb-6 md:px-12"><Link className="inline-flex min-h-11 items-center text-sm underline" href="/">← Back to the overview</Link><h1 className="mt-3 font-heading text-4xl md:text-5xl">Research, up close.</h1><p className="mt-3 max-w-2xl text-sm">Explore the structural visuals, then inspect the synthetic model. The model uses formulation variables, not the cryo-EM images.</p></div><EvidenceLayers /><MLPipeline /></main>
}
