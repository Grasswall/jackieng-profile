import type { Metadata } from 'next'
import Link from 'next/link'
import { ProteinBenchmark } from '@/components/ProteinBenchmark'

import '../protein-benchmark.css'
export const metadata: Metadata={title:'GB1 protein ML study — Jackie Ng',description:'An AI-assisted public GB1 experimental-fitness benchmark: trained inference, additive and pairwise models, disjoint variant evaluation and limitations. Not a drug-delivery model.'}
export default function Page(){return <main className="benchmark-page"><div className="benchmark-back"><Link href="/">← Scientific overview</Link><Link href="/research">Structural work ↗</Link></div><ProteinBenchmark/></main>}
