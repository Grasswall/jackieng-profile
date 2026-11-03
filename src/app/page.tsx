import { UnifiedHero } from '@/components/UnifiedHero'
import { UnifiedResearchEvidence } from '@/components/UnifiedResearchEvidence'
import { UnifiedStructuralWork } from '@/components/UnifiedStructuralWork'
import { UnifiedBenchmark } from '@/components/UnifiedBenchmark'
import { UnifiedProof } from '@/components/UnifiedProof'
import { UnifiedContact } from '@/components/UnifiedContact'


export default function Home() {
  return (
    <main className="unified-site" data-visual-release="taste-unified">
      <UnifiedHero />
      <UnifiedStructuralWork />
      <UnifiedBenchmark />
      <UnifiedResearchEvidence />
      <UnifiedProof />
      <UnifiedContact />
    </main>
  )
}
