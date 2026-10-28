'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Vision() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="bg-[#0B0E14] py-24 md:py-40"
    >
      <div ref={containerRef} className="max-w-4xl mx-auto px-6 md:px-12">
        <p data-reveal className="font-mono text-xs uppercase tracking-widest text-[#F97316] mb-6">
          Vision · direction, not yet validated
        </p>
        <h2
          id="vision-heading"
          data-reveal
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8FAFC] leading-[1.1]"
        >
          Delivery you can program.
        </h2>
        <p data-reveal className="mt-8 text-lg md:text-xl text-[#94A3B8] font-light leading-[1.6] max-w-[44ch]">
          Read the protein corona from structure, then design the particle to reach any organ. The brain is the first proof.
        </p>
      </div>
    </section>
  )
}
