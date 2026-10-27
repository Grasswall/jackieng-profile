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
    description: '20nm platform vs. conventional LNPs in mouse model. Quantified by fluorescence imaging at 24h post-injection.',
    imagePath: '/data/brain-accumulation.png',
    imageAlt: 'Brain accumulation comparison graph',
    highlight: 'p < 0.01',
  },
  {
    title: 'BBB Transcytosis',
    metric: '8× higher crossing',
    description: 'In vitro BBB model (hCMEC/D3 cells). Measured by FITC quantification after transwell assay.',
    imagePath: '/data/transcytosis-assay.png',
    imageAlt: 'Transcytosis assay results',
    highlight: 'Validated',
  },
  {
    title: 'Biodistribution Profile',
    metric: 'Multi-organ targeting',
    description: 'Organ accumulation at 24h. Brain selectivity maintained while reducing liver burden vs. standard LNPs.',
    imagePath: '/data/biodistribution.png',
    imageAlt: 'Organ biodistribution bar chart',
  },
  {
    title: 'Particle Characterization',
    metric: '20 ± 3 nm',
    description: 'DLS size distribution. Monodisperse population (PDI < 0.2). Stable in serum for 48h.',
    imagePath: '/data/dls-characterization.png',
    imageAlt: 'DLS size distribution curve',
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
              In vitro and in vivo data demonstrating superior BBB crossing and
              brain accumulation. All experiments conducted under GLP-compliant
              conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {inVivoData.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                className="border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-[#334155] transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="relative w-full h-64 bg-[#1E293B] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-sm text-[#94A3B8]">
                      Upload image to:
                      <br />
                      <code className="text-xs text-[#22D3EE]">
                        {item.imagePath}
                      </code>
                    </p>
                  </div>
                  {/* Uncomment when images are uploaded:
                  <Image
                    src={item.imagePath}
                    alt={item.imageAlt}
                    fill
                    className="object-contain"
                  />
                  */}
                </div>

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
                Partnership validation:
              </span>{' '}
              Platform validated by Sirnaomics (~$100M market cap,
              NASDAQ:RNA). Currently exploring CNS siRNA delivery applications
              targeting neurodegenerative diseases.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
