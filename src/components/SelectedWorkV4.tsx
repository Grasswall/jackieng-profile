'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const workCards = [
  {
    emoji: '🧬',
    title: 'THE GAP: Endosomal Escape',
    description:
      'Why 99% of drugs never reach their target — and how 20nm nanoparticles change the math.',
  },
  {
    emoji: '🎯',
    title: 'KRAS: Undruggable → Druggable',
    description:
      'How structural biology and AI-directed drug design cracked the "undruggable" oncogene.',
  },
  {
    emoji: '⚛️',
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
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2
          id="work-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-6"
        >
          Selected Work
        </h2>
        <p className="text-lg text-[#94A3B8] font-light leading-[1.6] mb-12 max-w-[42ch]">
          I translate molecular mechanisms and computational approaches for technical and non-technical audiences.
        </p>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {workCards.map((card, idx) => (
            <div
              key={idx}
              className="opacity-0 translate-y-8 bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[#22D3EE]"
              data-reveal
            >
              <div className="aspect-video bg-[#0B0E14] flex items-center justify-center text-6xl opacity-30 text-[#22D3EE]">
                {card.emoji}
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold tracking-tight text-[#F8FAFC] mb-2">
                  {card.title}
                </h4>
                <p className="text-[15px] leading-[1.6] text-[#94A3B8]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
