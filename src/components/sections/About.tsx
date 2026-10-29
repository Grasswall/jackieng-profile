'use client'

const facts: { label: string; value: string }[] = [
  { label: 'Founded', value: '2025' },
  { label: 'Based in', value: 'Hong Kong, PolyU' },
  { label: 'Platform', value: '20nm nanoliposome' },
]

const awards = [
  { name: 'ABCT RPG Symposium Best Oral Presentation', year: '2025' },
  { name: 'ABCT Outstanding Postgraduate Student Award', year: '2024' },
  { name: 'Selected Young Scientist, Hong Kong Laureate Forum', year: '2023' },
  { name: '8th GBA Digital Education STEAM, Silver Award', year: '' },
  { name: 'Techathon+ 10th Anniversary, Gold Medal', year: '' },
  { name: '贏在蘇州 Win in Suzhou, Rising Star Award', year: '' },
]

const press = [
  { name: '尋找創科的故事, RTHK Innovation Stories' },
  { name: '轉在北京, Beijing Coverage' },
  { name: 'Ming Pao / Sing Tao Interviews' },
  { name: 'HK01 Coverage' },
]

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-bg text-ink"
      style={{ paddingInline: 'var(--margin)', paddingBlock: 'clamp(4rem, 9vh, 6.5rem)' }}
      data-ink="dark"
    >
      <h2 id="about-heading" className="sr-only">About</h2>

      {/* Row one: label/value facts at the margin, paragraph from the 34% line */}
      <div className="grid md:grid-cols-[160px_1fr] gap-8 md:gap-0">
        <div className="flex flex-row md:flex-col gap-6 md:gap-5 flex-wrap" data-reveal>
          {facts.map((f) => (
            <div key={f.label}>
              <div className="text-[13px] text-muted">{f.label}</div>
              <div className="text-[13px] text-ink mt-0.5">{f.value}</div>
            </div>
          ))}
        </div>
        <p
          className="text-ink leading-[1.35] md:ml-[calc(34%-160px)]"
          style={{ fontSize: 'clamp(1.25rem, 1.7vw, 1.625rem)', maxWidth: '58ch' }}
          data-reveal
        >
          Jackie Ng is a structural biologist turned founder, building AtomBios while a PhD
          student at PolyU. Her platform is a 20 nanometre nanoliposome engineered to cross the
          blood&#8211;brain barrier, an 8&times; improvement in transcytosis and a
          3.2&#8211;fold increase in brain accumulation over conventional lipid nanoparticles,
          measured in vivo. The work started in cryo-EM, reading protein structure at atomic
          resolution, and is now pointed at machine learning for drug delivery.
        </p>
      </div>

      {/* Row two: record of the practice, same 34% line */}
      <div className="grid md:grid-cols-[160px_1fr] gap-8 md:gap-0 mt-20 md:mt-28">
        <div className="text-[13px] text-ink" data-reveal>Awards</div>
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-2 md:ml-[calc(34%-160px)]" data-reveal>
          <ul className="space-y-2.5">
            {awards.slice(0, 3).map((a) => (
              <li key={a.name} className="flex justify-between gap-6 text-[13px]">
                <span className="text-ink">{a.name}</span>
                <span className="text-muted shrink-0">{a.year}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-2.5">
            {awards.slice(3).map((a) => (
              <li key={a.name} className="flex justify-between gap-6 text-[13px]">
                <span className="text-ink">{a.name}</span>
                <span className="text-muted shrink-0">{a.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-[160px_1fr] gap-8 md:gap-0 mt-12">
        <div className="text-[13px] text-ink" data-reveal>Press</div>
        <ul className="grid sm:grid-cols-2 gap-x-16 gap-y-2.5 md:ml-[calc(34%-160px)]" data-reveal>
          {press.map((p) => (
            <li key={p.name} className="text-[13px] text-ink">
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
