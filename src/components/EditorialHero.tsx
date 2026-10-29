'use client'

// One message, repeated everywhere: "20 nanometers to the brain."
// Every figure below is verified (data/meta.json).
// Four capabilities, each with its own evidence. The combination is the signal.
const stack = [
  { role: 'Bench', proof: '8× BBB transcytosis, measured' },
  { role: 'Structure', proof: '5 cryo-EM structures solved, down to 2.7 Å' },
  { role: 'Model', proof: 'ML-guided particle design' },
  { role: 'Company', proof: 'AtomBios, HK$7.05M funded' },
]

export function EditorialHero() {
  return (
    <section
      aria-label="Hero"
      className="bg-[#F4F1EA] text-[#1C1A16] pt-16 md:pt-20 md:min-h-[100svh] grid grid-rows-[auto_auto] md:grid-rows-1 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]"
    >
      <div className="order-2 md:order-1 flex flex-col justify-center px-6 py-7 md:px-12 lg:px-16 md:py-16">
        <p className="font-body text-xs uppercase tracking-[0.14em] text-[#A5460A] mb-5">
          Jackie Ng · Founder-scientist, AtomBios
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

        <p className="font-body text-lg md:text-xl leading-snug text-[#3A362E] max-w-[40ch] mb-6 md:mb-8">
          One scientist across the bench, the microscope, the model and the company.
        </p>

        <dl className="font-body grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 mb-6 md:mb-9 border-t border-[#1C1A16]/20 pt-5 max-w-[46rem]">
          {stack.map((s) => (
            <div key={s.role} className="flex flex-col">
              <dt className="font-heading text-xl font-semibold leading-none">{s.role}</dt>
              <dd className="mt-1.5 text-xs text-[#5A5448] leading-snug">{s.proof}</dd>
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

      <figure className="order-1 md:order-2 relative m-0 aspect-[16/9] md:aspect-auto overflow-hidden bg-[#1C1A16]">
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
