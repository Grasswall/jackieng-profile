import Link from 'next/link'

const coverage = [
  { outlet: 'RTHK', title: '尋找創科的故事', format: 'Television interview · Innovation Stories' },
  { outlet: 'Beijing Television', title: '轉在北京', format: 'Television feature' },
  { outlet: 'Ming Pao · Sing Tao', title: 'Science and entrepreneurship', format: 'Published print interviews' },
]

export function MediaProof() {
  return (
    <section id="media" aria-labelledby="media-proof-heading" className="on-dark scroll-mt-16 bg-deep px-6 py-16 text-cream md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Selected media</p>
        <h2 id="media-proof-heading" className="mt-3 font-heading text-4xl leading-tight md:text-6xl">Science, in public.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {coverage.map(item => <article key={item.outlet} className="border-t border-cream/30 pt-5">
            <h3 className="font-heading text-3xl">{item.outlet}</h3>
            <p className="mt-3 text-lg">{item.title}</p>
            <p className="mt-2 text-sm text-cream/75">{item.format}</p>
          </article>)}
        </div>
        <Link href="/speaking" className="mt-10 inline-flex min-h-11 items-center text-signal underline underline-offset-4">View media features & speaking →</Link>
      </div>
    </section>
  )
}
