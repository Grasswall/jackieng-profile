'use client'

const basePath = '/jackieng-profile'

export function Showcase() {
  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="relative bg-bg text-ink overflow-hidden"
      style={{ paddingInline: 'var(--margin)', paddingBlock: 'clamp(4rem, 9vh, 6rem)' }}
      data-ink="dark"
    >
      <h2 id="showcase-heading" className="sr-only">Structure to delivery</h2>

      <div className="grid md:grid-cols-2">
        {/* Left word: what she started with */}
        <div className="flex flex-col justify-between py-6 md:py-10 border-b md:border-b-0 md:border-r border-ink/15 pr-0 md:pr-10">
          <span
            className="font-display font-extrabold uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
            data-reveal
          >
            Cryo&#8209;EM
          </span>
          <p className="mt-6 max-w-[34ch] text-[15px] text-muted" data-reveal>
            PDB 9X3T &amp; 9X3V, Vibrio flagellar filament structures solved at atomic
            resolution. Published, J. Biological Chemistry, 2024.
          </p>
          <div className="mt-8 aspect-[4/3] bg-surface overflow-hidden" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/assets/render-tim-structure.jpg`}
              alt="Cryo-EM structural render of a protein assembly"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right word: what it became */}
        <div className="flex flex-col justify-between py-6 md:py-10 pl-0 md:pl-10 mt-10 md:mt-0">
          <span
            className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-accent"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
            data-reveal
          >
            Delivery
          </span>
          <p className="mt-6 max-w-[34ch] text-[15px] text-muted" data-reveal>
            A 20nm nanoliposome, engineered to cross the blood&#8211;brain barrier: 8&times;
            transcytosis, 3.2&#8211;fold brain accumulation versus conventional LNPs, in vivo.
          </p>
          <div className="mt-8 aspect-[4/3] bg-surface overflow-hidden" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/assets/render-capsid.jpg`}
              alt="Molecular render of a nanoparticle delivery structure"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
