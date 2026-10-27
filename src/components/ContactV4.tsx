'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

interface ContactSocialLink {
  label: string
  href: string
  icon: 'linkedin' | 'instagram'
}

interface ContactProps {
  email: string
  socialLinks: ContactSocialLink[]
  copyright: string
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

const iconMap = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
}

export function ContactV4({ email, socialLinks, copyright }: ContactProps) {
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
          Let&apos;s work together
        </h2>

        <p
          data-reveal
          className="text-lg text-[#94A3B8] font-light leading-[1.6] mb-12 max-w-[50ch] mx-auto"
        >
          I&apos;m open to senior drug delivery roles, AI for therapeutics positions, platform engineering opportunities, and technical consulting.
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

        {/* Social row */}
        <div data-reveal className="mt-8 flex items-center justify-center gap-5">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors duration-200"
              >
                <Icon />
              </a>
            )
          })}
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-[#334155]">
          <p className="text-xs text-[#94A3B8]/60 tracking-wider">{copyright}</p>
        </div>
      </div>
    </section>
  )
}
