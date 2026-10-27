'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const directions = [
  {
    title: 'Protein Corona Engineering',
    description:
      "Current LNP design avoids protein adsorption. I'm exploring the opposite: programming corona composition to control organ targeting. Design lipid formulations that recruit specific plasma proteins (ApoE, IgM, others) to direct biodistribution.",
    status: 'Research direction',
  },
  {
    title: 'AI-Guided Multivariable Optimization',
    description:
      "Formulation design today is empirical — screen hundreds of lipid ratios, pick the winner. I'm building predictive models: input target organ, output lipid composition + corona prediction + expected biodistribution. Cut discovery time 10×.",
    status: 'Research direction',
  },
  {
    title: 'Cross-Lab Validation Dataset',
    description:
      'Existing protein corona ML models fail across labs because training data describes proteins, not formulation parameters. Building a design-of-experiments dataset linking lipid composition → proteomics → in vivo distribution with independent validation.',
    status: 'In progress',
  },
]

export function ResearchDirections() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="research"
      className="bg-[#0B0E14] py-20 md:py-32"
      aria-labelledby="research-heading"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2
            id="research-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
          >
            Research Directions
          </h2>
          <p className="text-xl text-[#94A3B8] max-w-2xl">
            Beyond validated brain delivery — exploring programmable organ targeting through protein corona design and AI-guided formulation.
          </p>
        </div>

        <div ref={containerRef} className="space-y-8">
          {directions.map((item, idx) => (
            <div
              key={idx}
              className="opacity-0 translate-y-8 border border-[#1E293B] bg-[#0F172A]/60 backdrop-blur-sm rounded-2xl p-8 hover:border-[#334155] transition-colors duration-300"
              data-reveal
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl font-semibold text-[#F8FAFC]">
                  {item.title}
                </h3>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-wide text-[#22D3EE] bg-[#22D3EE]/10 rounded-full border border-[#22D3EE]/20 whitespace-nowrap">
                  {item.status}
                </span>
              </div>
              <p className="text-[17px] leading-[1.7] text-[#94A3B8]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border border-[#22D3EE]/20 bg-[#22D3EE]/5 rounded-xl">
          <p className="text-[15px] leading-[1.7] text-[#94A3B8]">
            <span className="font-semibold text-[#22D3EE]">Market context:</span>{' '}
            AI-guided LNP delivery saw 4 major pharma deals in 2026 (Lilly × METiS $1.1B, Lilly × QurCan $237M/program, Novartis × Sironax $125M, J&J × Nosis expansion). Corona-programmable platforms remain an open whitespace — no dedicated player yet.
          </p>
        </div>
      </div>
    </section>
  )
}
