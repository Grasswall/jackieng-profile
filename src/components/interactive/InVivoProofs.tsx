'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
// import Image from 'next/image'

interface DataCard {
  title: string
  metric: string
  description: string
  imagePath: string
  imageAlt: string
  highlight?: string
}

const inVivoData: DataCard[] = [
  {
    title: 'Brain Accumulation',
    metric: '3.2-fold increase',
    description: '20nm platform vs. conventional LNPs, in vivo.',
    imagePath: '/data/brain-accumulation.png',
    imageAlt: 'Brain accumulation comparison graph',
    highlight: 'p < 0.01',
  },
  {
    title: 'BBB Transcytosis',
    metric: '8× higher crossing',
    description: 'BBB transcytosis of the 20nm platform vs. conventional LNPs.',
    imagePath: '/data/transcytosis-assay.png',
    imageAlt: 'Transcytosis assay results',
    highlight: 'Validated',
  },
]

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
              Two headline results for the 20nm platform versus conventional LNPs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {inVivoData.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                className="border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-[#334155] transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-[#F8FAFC]">
                      {item.title}
                    </h3>
                    {item.highlight && (
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-wide text-[#22D3EE] bg-[#22D3EE]/10 rounded-full border border-[#22D3EE]/20">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-[#22D3EE] mb-3">
                    {item.metric}
                  </p>
                  <p className="text-[15px] leading-[1.7] text-[#94A3B8]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
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
