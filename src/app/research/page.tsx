import type { Metadata } from 'next'
import Link from 'next/link'
import { StructuralWork } from '@/components/StructuralWork'
import '../dossier.css'
import { EvidenceLayers } from '@/components/motion/EvidenceLayers'
import { MLPipeline } from '@/components/MLPipeline'
export const metadata: Metadata = { title: 'Research & ML pipeline — Jackie Ng', description: 'Structural evidence, a real-data GB1 protein ML benchmark and a separate historical synthetic formulation simulation. Not the private AtomBios model.' }
export default function ResearchPage() {
  return <main className="bg-cream pt-24"><div className="mx-auto max-w-6xl px-6 pb-6 md:px-12"><Link className="inline-flex min-h-11 items-center text-sm underline" href="/">← Back to the overview</Link><h1 className="mt-3 font-heading text-4xl md:text-5xl">Research, up close.</h1><p className="mt-3 max-w-2xl text-sm">Explore my structural work and the separate public protein-ML study. The historical synthetic formulation demo is an additional simulation, not a protein model or delivery evidence.</p><Link className="inline-flex min-h-11 items-center text-sm underline" href="/protein-benchmark">Inspect the real-data GB1 model study ↗</Link></div><StructuralWork /><EvidenceLayers /><MLPipeline /></main>
}
