'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

// Bridge between the cryo-EM corona section and the ML section. It states
// only what is true: the cryo-EM shows the protein that forms the corona, the
// model takes formulation variables that a corona-driven design would tune,
// and the model does NOT consume the cryo-EM data.
const inputs = [
  'Particle size',
  'SORT lipid type and mol%',
  'ApoE ligand density',
  'PEG mol%',
]

export function StructuralBridge() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="structural-bridge"
      className="bg-[#0B0E14] py-12 md:py-16"
      aria-labelledby="bridge-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef}>
          <div
            data-reveal
            className="rounded-2xl border border-[#1E293B] bg-[#0F172A]/60 p-6 md:p-8"
          >
            <h3
              id="bridge-heading"
              className="text-sm font-semibold uppercase tracking-wide text-[#22D3EE] mb-4"
            >
              From structure to model
            </h3>
            <p className="text-[#94A3B8] text-sm md:text-base mb-6 max-w-3xl">
              Above: the protein complex that forms our LNP&apos;s corona,
              resolved by cryo-EM. Below: a simulated model that takes the
              formulation variables a corona-focused design would tune. The
              model does not read the cryo-EM data. It runs on synthetic
              rules, and the link between the two is the question I want to
              answer with real data.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Model inputs">
              {inputs.map((i) => (
                <li
                  key={i}
                  className="text-xs font-mono text-[#34D399] px-3 py-1.5 rounded-full border border-[#34D399]/30"
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
