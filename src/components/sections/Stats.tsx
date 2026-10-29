'use client'

const receipt = [
  { label: 'HKSTP Incu-Bio', value: 'HK$6M' },
  { label: 'Other grants & scholarships', value: 'HK$1.05M' },
]

export function Stats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="bg-bg text-ink"
      style={{ paddingInline: 'var(--margin)', paddingBlock: 'clamp(4rem, 9vh, 6rem)' }}
      data-ink="dark"
    >
      <h2 id="stats-heading" className="sr-only">Funding</h2>

      <div className="flex flex-col items-center text-center">
        <div
          className="font-display font-extrabold tracking-tight"
          style={{ fontSize: 'clamp(4rem, 17vw, 13rem)', lineHeight: 0.9 }}
          data-reveal
        >
          HK$7.05M
        </div>
        <p className="mt-4 text-[15px] text-muted" data-reveal>
          raised to build the blood&#8211;brain barrier delivery platform
        </p>
      </div>

      {/* The receipt: a short, honest breakdown adding up to the total above.
          This is a real ledger, not a decorative rule. taste-skill-ignore hairline */}
      <div className="mt-16 md:mt-20 max-w-md mx-auto" data-reveal>
        <ul className="space-y-3">
          {receipt.map((r) => (
            <li key={r.label} className="flex justify-between py-1 text-[14px]">
              <span className="text-muted">{r.label}</span>
              <span className="text-ink tabular-nums">{r.value}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between pt-4 mt-3 text-[14px] font-medium">
          <span className="text-ink">Total secured</span>
          <span className="text-ink tabular-nums">HK$7.05M</span>
        </div>
      </div>
    </section>
  )
}
