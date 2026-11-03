import type { Metadata } from 'next'
import Link from 'next/link'
import { UnifiedStructuralWork } from '@/components/UnifiedStructuralWork'
import { UnifiedBenchmark } from '@/components/UnifiedBenchmark'
import { UnifiedResearchEvidence } from '@/components/UnifiedResearchEvidence'
import { UnifiedContact } from '@/components/UnifiedContact'
export const metadata: Metadata={title:'Work — Jackie Ng',description:'Selected cryo-EM structural work, an executable public protein-fitness study and a separate drug-delivery research direction.'}
export default function WorkPage(){return <main className="unified-site"><header className="u-page-header"><Link href="/">← Overview</Link><h1>Work you can inspect.</h1><p>Structural biology is the foundation. The public GB1 study is a separate modelling example. Protein interactions in delivery are the research direction.</p></header><UnifiedStructuralWork expanded/><UnifiedBenchmark/><UnifiedResearchEvidence/><section className="u-section u-section-cream"><h2>Published and public records.</h2><p>These records are separate from the in-progress structural models shown above.</p><div className="u-link-row"><a href="https://doi.org/10.1016/j.jbc.2024.107390">Co-authored research · JBC 2024 ↗</a><a href="https://www.rcsb.org/structure/9X3T">Public record · PDB 9X3T ↗</a><a href="https://www.rcsb.org/structure/9X3V">Public record · PDB 9X3V ↗</a></div><Link className="benchmark-link" href="/research">Research context and independent evidence ↗</Link></section><UnifiedContact/></main>}
