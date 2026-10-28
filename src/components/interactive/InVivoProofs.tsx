'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

// Both bars are drawn to scale from the two verified platform numbers.
// No in vivo image files exist yet (public/data/ is empty) — these are
// chart renders of real, confirmed figures, not photographs of assay plates.

function ScaledBarChart({
  title,
  unit,
  bars,
  footnote,
}: {
  title: string
  unit: string
  bars: { label: string; value: number; color: string }[]
  footnote: string
}) {
  const max = Math.max(...bars.map((b) => b.value))
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-[#F8FAFC] mb-5">{title}</h3>
      <div className="space-y-4">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#94A3B8]">{b.label}</span>
              <span className="font-mono text-[#F8FAFC]">
                {b.value}
                {unit}
              </span>
            </div>
            <div className="h-5 rounded-md bg-[#1E293B] overflow-hidden">
              <div
                className="h-full rounded-md"
                style={{
                  width: `${Math.max((b.value / max) * 100, 4)}%`,
                  backgroundColor: b.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-[#64748B]">{footnote}</p>
    </div>
  )
}

export function InVivoProofs() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="in-vivo-proofs"
      className="bg-[#0B0E14] py-20 md:py-32"
      aria-labelledby="proofs-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-12">
          <div data-reveal>
            <h2
              id="proofs-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              Platform Validation
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              Two headline results for the 20nm platform versus conventional
              LNPs. Charted to scale from the confirmed figures below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              data-reveal
              className="border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl overflow-hidden"
            >
              <ScaledBarChart
                title="BBB transcytosis"
                unit="×"
                bars={[
                  { label: 'Conventional LNP', value: 1, color: '#334155' },
                  { label: 'AtomBios 20nm platform', value: 8, color: '#22D3EE' },
                ]}
                footnote="8× higher blood-brain barrier crossing vs. conventional LNPs."
              />
            </div>
            <div
              data-reveal
              className="border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl overflow-hidden"
            >
              <ScaledBarChart
                title="Brain accumulation, in vivo"
                unit="×"
                bars={[
                  { label: 'Conventional LNP', value: 1, color: '#334155' },
                  { label: 'AtomBios 20nm platform', value: 3.2, color: '#F97316' },
                ]}
                footnote="3.2-fold brain accumulation vs. conventional LNPs (p < 0.01)."
              />
            </div>
          </div>

          <div
            data-reveal
            className="border border-[#F97316]/20 bg-[#F97316]/5 rounded-xl p-6"
          >
            <p className="text-[15px] leading-[1.7] text-[#94A3B8]">
              <span className="font-semibold text-[#F97316]">
                Partnership:
              </span>{' '}
              Working with Sirnaomics.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
