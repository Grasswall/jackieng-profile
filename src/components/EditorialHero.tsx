'use client'

// One message, repeated everywhere: "20 nanometers to the brain."
// Every figure below is verified (data/meta.json).
const facts = [
  { v: '8×', k: 'transcytosis across the BBB' },
  { v: '3.2-fold', k: 'brain accumulation vs. conventional LNPs' },
  { v: 'HK$7.05M', k: 'funding secured' },
]

export function EditorialHero() {
  return (
    <section
      aria-label="Hero"
      className="bg-[#F4F1EA] text-[#1C1A16] pt-16 md:pt-20 md:min-h-[100svh] grid grid-rows-[auto_auto] md:grid-rows-1 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]"
    >
      <div className="order-2 md:order-1 flex flex-col justify-center px-6 py-7 md:px-12 lg:px-16 md:py-16">
        <p className="font-body text-xs uppercase tracking-[0.14em] text-[#A5460A] mb-5">
          Jackie Ng · Structural ML scientist · Founder, AtomBios
        </p>

        <h1 className="font-heading font-semibold text-[clamp(2.9rem,5.2vw,5.4rem)] leading-[0.96] tracking-tight mb-5 md:mb-6">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block ed-rise" style={{ animationDelay: '0.1s' }}>
              20 nanometers
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block ed-rise" style={{ animationDelay: '0.25s' }}>
              to the brain.
            </span>
          </span>
        </h1>

        <p className="font-body text-lg md:text-xl leading-snug text-[#3A362E] max-w-[34ch] mb-6 md:mb-8">
          I engineer nanoparticles that cross the blood-brain barrier.
        </p>

        <dl className="font-body flex flex-wrap gap-x-8 gap-y-3 mb-6 md:mb-9">
          {facts.map((f) => (
            <div key={f.k} className="flex flex-col max-w-[11rem]">
              <dd className="font-heading text-3xl font-semibold leading-none">{f.v}</dd>
              <dt className="mt-1 text-xs text-[#5A5448] leading-snug">{f.k}</dt>
            </div>
          ))}
        </dl>

        <a
          href="mailto:jackie.ng@atombios.com?subject=Let%27s%20build%20delivery%20together"
          className="group inline-flex w-fit items-center gap-3 font-body text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A5460A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA] rounded-full"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1C1A16] transition-all duration-300 group-hover:bg-[#1C1A16] group-hover:rotate-45 group-active:scale-90">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-[#1C1A16] group-hover:stroke-[#F4F1EA] transition-colors"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          Build with me
        </a>
      </div>

      <figure className="order-1 md:order-2 relative m-0 aspect-[16/10] md:aspect-auto overflow-hidden bg-[#1C1A16]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/jackieng-profile/images/gallery/suzhou-pitch.jpg"
          alt="Jackie Ng pitching AtomBios at the WIN in Suzhou Global Entrepreneurship Competition finals"
          className="absolute inset-0 h-full w-full object-cover object-[88%_50%] md:object-[63%_50%] ed-reveal"
        />
        <figcaption className="absolute bottom-0 right-0 left-0 px-4 pb-3 pt-10 font-body text-[11px] text-white/80 bg-gradient-to-t from-black/55 to-transparent">
          Pitching AtomBios, WIN in Suzhou Global Finals, 2026
        </figcaption>
      </figure>
    </section>
  )
}
