import type { Metadata } from 'next'
import { ResearchDossier } from '@/components/professional-review/ResearchDossier'
import { ReviewBar } from '@/components/professional-review/ReviewBar'

export const metadata: Metadata = {
  title: 'B · Research dossier · Design preview',
  description: 'Technical artifacts and explicit contributions first.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <main style={{ paddingTop: 64 }}>
      <ReviewBar current="b" />
      <ResearchDossier />
    </main>
  )
}
