import Link from 'next/link'

// Wording from TalentSignal.tsx and brand/BRAND_STATUS.md; participation is not an award.
const ENTRIES = [
  { category: 'Competition', name: 'PKU–Cambridge', detail: 'Hong Kong Station · Champion', year: '2026' },
  { category: 'Competition', name: 'Techathon+', detail: '10th Anniversary · Gold Medal', year: '2026' },
  { category: 'Academic selection', name: 'Lindau', detail: 'Nobel Laureate Meeting · Selected participant', year: '2025' },
  { category: 'Academic representation', name: 'Shaw Prize Forum', detail: 'Academic Representative · Laureates Roundtable', year: '2025' },
]
export function Accolades() {
  return (
    <section id="proof" aria-labelledby="accolades-heading" className="scroll-mt-16 bg-cream px-6 py-14 text-ink md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">Selected recognition</p>
          <h2 id="accolades-heading" className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Accolades &amp; academic selection.</h2></div>
          <Link href="/speaking" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">Events &amp; media ↗</Link>
        </div>
        <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
          {ENTRIES.map(x => <li key={x.name} className="border-t border-ink/20 py-6">
            <p className="flex justify-between gap-4 text-xs uppercase tracking-widest text-stone"><span>{x.category}</span><span>{x.year}</span></p>
            <h3 className="mt-3 font-heading text-3xl">{x.name}</h3>
            <p className="mt-2 text-sm leading-relaxed">{x.detail}</p>
          </li>)}
        </ul>
      </div>
    </section>
  )
}
