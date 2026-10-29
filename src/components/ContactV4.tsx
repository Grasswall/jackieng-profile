'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

interface ContactProps {
  email: string
}

export function ContactV4({ email }: ContactProps) {
  const containerRef = useScrollReveal({ stagger: 0.1 })

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#0B0E14] py-20 md:py-32 text-center"
    >
      <div ref={containerRef} className="max-w-4xl mx-auto px-6 md:px-12">
        <h2
          data-reveal
          id="contact-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-6"
        >
          Partner with me, or join the team.
        </h2>

        <p
          data-reveal
          className="text-lg text-[#94A3B8] font-light leading-[1.6] mb-12 max-w-[50ch] mx-auto"
        >
          Pharma and biotech teams with a payload stuck at the blood-brain barrier. Investors in CNS delivery. Scientists who work across the bench, structure and ML and want to build AtomBios with me.
        </p>

        {/* Email CTA */}
        <a
          data-reveal
          href={`mailto:${email}`}
          className="inline-block text-xl font-semibold tracking-tight text-[#0B0E14] bg-[#F97316] hover:bg-[#22D3EE] px-10 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          aria-label={`Email ${email}`}
        >
          Email me
        </a>

        {/* Sub-CTA */}
        <p
          data-reveal
          className="mt-12 text-[15px] text-[#94A3B8] leading-[1.8]"
        >
          CNS delivery. mRNA and siRNA beyond liver. ML for formulation design.
        </p>

      </div>
    </section>
  )
}
