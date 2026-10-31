import type { Metadata } from 'next'
import { FounderNarrative } from '@/components/professional-review/FounderNarrative'
import { ReviewBar } from '@/components/professional-review/ReviewBar'

export const metadata: Metadata = {
  title: 'C · Founder-scientist narrative · Design preview',
  description: 'Bench to structure to model to company.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <main style={{ paddingTop: 64 }}>
      <ReviewBar current="c" />
      <FounderNarrative />
    </main>
  )
}
