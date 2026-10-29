const spans = [
  {
    label: 'See',
    title: 'Molecular structure',
    body: 'Five cryo-EM structures solved, including a 2.7 Å structure of the E. coli acetyl-CoA carboxylase complex.',
  },
  {
    label: 'Build',
    title: 'Delivery that matters',
    body: 'A 20 nm AtomBios platform with 8× BBB transcytosis and 3.2× brain accumulation versus conventional LNPs.',
  },
  {
    label: 'Carry',
    title: 'Science into the world',
    body: 'Founder of AtomBios, turning the biology into a funded company with HK$7.05M raised and a Sirnaomics collaboration.',
  },
]

export function UniqueSpan() {
  return (
    <section id="unique-span" aria-labelledby="unique-span-heading" className="bg-deep py-20 text-cream md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm uppercase tracking-[0.18em] text-signal">The uncommon span</p>
          <h2 id="unique-span-heading" className="font-heading text-5xl font-semibold leading-[0.98] tracking-tight text-balance md:text-7xl">
            From molecular structure<br />
            to a company.
          </h2>
          <p className="mt-7 max-w-[47ch] text-lg leading-relaxed text-mist md:text-xl">
            I can move from molecular structure to delivery platform to company execution — and keep the scientific thread intact.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3" aria-label="Three ways Jackie contributes">
          {spans.map((span) => (
            <li key={span.label} className="bg-deep p-7 md:min-h-[18rem] md:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-5">
                <span className="font-heading text-3xl text-signal">{span.label}</span>
              </div>
              <h3 className="mt-7 font-heading text-3xl font-semibold leading-tight">{span.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-mist">{span.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
