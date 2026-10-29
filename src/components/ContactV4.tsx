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
          Working on brain delivery? Talk to me.
        </h2>

        <p
          data-reveal
          className="text-lg text-[#94A3B8] font-light leading-[1.6] mb-12 max-w-[50ch] mx-auto"
        >
          I&apos;m open to brain/CNS delivery roles, AI for therapeutics positions, platform engineering opportunities, and technical consulting.
        </p>

        {/* Email CTA */}
        <a
          data-reveal
          href={`mailto:${email}`}
          className="inline-block text-xl font-semibold tracking-tight text-[#0B0E14] bg-[#F97316] hover:bg-[#22D3EE] px-10 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          aria-label={`Email ${email}`}
        >
          Get in touch
        </a>

        {/* Sub-CTA */}
        <p
          data-reveal
          className="mt-12 text-[15px] text-[#94A3B8] leading-[1.8]"
        >
          Especially interested in CNS drug delivery, solid tumor targeting, mRNA/siRNA therapeutics beyond liver, and AI for formulation design.
        </p>

      </div>
    </section>
  )
}
