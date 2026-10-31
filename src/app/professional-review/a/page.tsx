import type { Metadata } from 'next'
import { EditorialScientist } from '@/components/professional-review/EditorialScientist'
import { ReviewBar } from '@/components/professional-review/ReviewBar'

export const metadata: Metadata = {
  title: 'A · Editorial scientist · Design preview',
  description: 'Photo-led personal identity with curated evidence.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <main style={{ paddingTop: 64 }}>
      <ReviewBar current="a" />
      <EditorialScientist />
    </main>
  )
}
