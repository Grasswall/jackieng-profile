'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const workItems = [
  {
    title: 'THE GAP: Endosomal Escape',
    description:
      'Why 99% of drugs never reach their target, and how 20nm nanoparticles change the math.',
  },
  {
    title: 'KRAS: Undruggable → Druggable',
    description:
      'How structural biology and AI-directed drug design cracked the "undruggable" oncogene.',
  },
  {
    title: 'Arms Race: 3-Drug Resistance',
    description:
      'CFD simulations of drug unbinding dynamics and resistance mechanisms in cancer therapy.',
  },
]

export function SelectedWorkV4() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="work"
      className="bg-[#0F172A] py-20 md:py-32"
      aria-labelledby="work-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <div>
          <h2
            id="work-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-6"
          >
            Selected Work
          </h2>
          <p className="text-lg text-[#94A3B8] font-light leading-[1.6] max-w-[36ch]">
            I translate molecular mechanisms and computational approaches for
            technical and non-technical audiences.
          </p>
        </div>

        <div ref={containerRef} role="list" className="divide-y divide-[#1E293B] border-y border-[#1E293B]">
          {workItems.map((item, idx) => (
            <div
              key={item.title}
              role="listitem"
              data-reveal
              className="group grid grid-cols-[4.5rem_1fr] md:grid-cols-[6rem_1fr] items-baseline gap-4 py-8 transition-colors duration-200 hover:bg-[#1E293B]/40"
            >
              <span className="font-mono text-5xl md:text-6xl font-bold leading-none bg-gradient-to-br from-[#22D3EE] to-[#F97316] bg-clip-text text-transparent opacity-80 group-hover:opacity-100">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F8FAFC] mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#94A3B8] max-w-[56ch]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
