'use client'

const facts = [
  { k: 'Transcytosis', v: '8×' },
  { k: 'Brain accumulation', v: '3.2-fold' },
  { k: 'Funding', v: 'HK$7.05M' },
  { k: 'Access', v: 'Lindau Nobel 2025 · Shaw Prize Forum 2025' },
]

export function EditorialHero() {
  return (
    <section
      aria-label="Hero"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#1C1A16] text-[#F4F1EA]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/jackieng-profile/images/gallery/suzhou-pitch.jpg"
        alt="Jackie Ng pitching AtomBios at the WIN in Suzhou Global Entrepreneurship Competition finals"
        className="absolute inset-0 h-full w-full object-cover object-[78%_28%] ed-reveal"
      />

      {/* Uniform dark wash: this photo's slide content is too bright/busy for a light
          gradient to beat anywhere text sits, so the whole frame is subdued and the
          photo reads as a recognizable backdrop rather than a legibility hazard. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#0A0907]/70" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,9,7,0.75) 0%, rgba(10,9,7,0.55) 45%, rgba(10,9,7,0.35) 70%, rgba(10,9,7,0.6) 100%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 pt-28 md:px-12 md:pb-14">
        <p className="font-body text-[11px] uppercase tracking-[0.14em] text-[#E8A06B] mb-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]">
          — Jackie Ng · Founder, AtomBios
        </p>

        <h1 className="font-heading font-medium text-[clamp(2.6rem,8vw,6.4rem)] leading-[0.98] tracking-tight mb-6 max-w-5xl [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block ed-rise" style={{ animationDelay: '0.1s' }}>
              Structural ML scientist.
            </span>
          </span>
        </h1>

        <p className="font-body text-lg md:text-2xl leading-snug text-[#F4F1EA]/85 max-w-[46ch] mb-8">
          Let&apos;s program delivery. 20nm nanoparticles cross the blood-brain barrier.
        </p>

        <dl className="font-body grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3 max-w-3xl mb-8 text-sm [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
          {facts.map((f) => (
            <div key={f.k} className={f.k === 'Access' ? 'col-span-2 flex flex-col' : 'flex flex-col'}>
              <dd className="font-semibold text-base">{f.v}</dd>
              <dt className="text-[#F4F1EA]/70 text-xs">{f.k}</dt>
            </div>
          ))}
        </dl>

        <a
          href="mailto:jackie.ng@atombios.com?subject=Let%27s%20build%20delivery%20together"
          className="group inline-flex w-fit items-center gap-3 font-body text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A06B] rounded-full"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F4F1EA] transition-all duration-300 group-hover:bg-[#F4F1EA] group-hover:rotate-45 group-active:scale-90">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-[#F4F1EA] group-hover:stroke-[#1C1A16] transition-colors" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          Build with me
        </a>

        <p className="absolute bottom-3 right-6 md:right-12 font-body text-[11px] text-[#F4F1EA]/40">
          Pitching AtomBios, WIN in Suzhou Global Finals, 2026
        </p>
      </div>
    </section>
  )
}
