'use client'

export function WaterlineHero() {
  return (
    <section
      className="relative min-h-[70svh] lg:min-h-[100svh] flex flex-col overflow-hidden bg-bg text-ink"
      style={{ padding: 'var(--margin)' }}
      aria-label="Hero"
      data-ink="dark"
    >
      {/* Headline and its supporting row are one composed block, pinned
          to the bottom together; any leftover viewport space falls above
          the headline, not between the headline and the bio/CTA row */}
      <div className="flex-1 flex flex-col justify-end gap-10 lg:gap-14 pt-20 lg:pt-28 pb-8 lg:pb-10">
        <h1
          className="lines font-display uppercase"
          style={{
            fontSize: 'clamp(3.1rem, 12.5vw, 11rem)',
            fontWeight: 800,
            lineHeight: 0.86,
            letterSpacing: '-0.03em',
          }}
        >
          <span className="line block">
            <span data-line style={{ '--i': 0 } as React.CSSProperties} className="block text-ink">
              Atoms into
            </span>
          </span>
          <span className="line block">
            <span data-line style={{ '--i': 1 } as React.CSSProperties} className="block text-ink">
              medicine.
            </span>
          </span>
        </h1>

        {/* Supporting sentence + primary action on the same baseline, per the hero blueprint */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="max-w-[26ch] text-[17px] text-muted leading-[1.5] order-2 md:order-1">
            Jackie Ng builds nanoparticles that cross the blood&#8211;brain barrier, out of a
            cryo-EM structural biology background. Founder, AtomBios.
          </p>
          <a
            href="mailto:jackie.ng@atombios.com?subject=Let%27s%20build%20delivery%20together"
            className="button order-1 md:order-2 inline-flex items-center justify-center shrink-0 px-7 py-4 bg-accent text-accent-ink text-[16px] font-medium hover:bg-[#1a2a35] focus-visible:outline-none"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
