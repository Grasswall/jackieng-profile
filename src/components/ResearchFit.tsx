export function ResearchFit() {
  return (
    <section id="work-index" aria-labelledby="fit-heading" className="scroll-mt-16 bg-cream px-6 py-14 text-ink md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em]">My contribution</p>
        <h2 id="fit-heading" className="mt-3 max-w-3xl font-heading text-4xl leading-tight md:text-5xl">Structural biology is my core.<br />ML extends the questions I can ask.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <article className="border-t border-ink/25 pt-5">
            <p className="text-xs uppercase tracking-widest">01 / Strongest evidence</p>
            <h3 className="mt-3 font-heading text-3xl">Solve molecular structures.</h3>
            <p className="mt-3 text-sm leading-relaxed">Five cryo-EM structures solved; best resolution 2.7 Å. My structural work is the most concrete starting point for a research role.</p>
            <p className="mt-3 text-xs leading-relaxed">Five-structure set: publication in progress. Public entries below are separate records, not the 2.7 Å structure.</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm"><a className="inline-flex min-h-11 items-center underline" href="https://www.rcsb.org/structure/9X3T">9X3T ↗</a><a className="inline-flex min-h-11 items-center underline" href="https://www.rcsb.org/structure/9X3V">9X3V ↗</a><a className="inline-flex min-h-11 items-center underline" href="#evidence">See the structural work ↓</a></div>
          </article>
          <article className="border-t border-ink/25 pt-5">
            <p className="text-xs uppercase tracking-widest">02 / Computational contribution</p>
            <h3 className="mt-3 font-heading text-3xl">Train models for LNP design.</h3>
            <p className="mt-3 text-sm leading-relaxed">I train machine-learning models at AtomBios. The public demonstration makes the input encoding, learning and inference inspectable.</p>
            <p className="mt-3 text-xs leading-relaxed">The demo uses synthetic data. It does not disclose the private model or establish experimental efficacy.</p>
            <a className="mt-4 inline-flex min-h-11 items-center text-sm underline" href="#ml-pipeline">Follow the data → model pipeline ↓</a>
          </article>
          <article className="border-t border-ink/25 pt-5">
            <p className="text-xs uppercase tracking-widest">03 / Application</p>
            <h3 className="mt-3 font-heading text-3xl">Build around a delivery problem.</h3>
            <p className="mt-3 text-sm leading-relaxed">As founder of AtomBios, I work on lipid nanoparticles for brain delivery. The company gives the research a concrete application—not a substitute for scientific evidence.</p>
            <p className="mt-3 text-xs leading-relaxed">Delivery measurements and HK$7.05M funding are team/company results, not personal research outputs.</p>
            <a className="mt-4 inline-flex min-h-11 items-center text-sm underline" href="mailto:jackie.ng@atombios.com?subject=LNP%20research%20collaboration">Discuss LNP research ↗</a>
          </article>
        </div>
        <div className="mt-10 grid gap-6 border-t border-ink/25 pt-7 md:grid-cols-2">
          <div><h3 className="font-heading text-2xl">For research teams</h3><p className="mt-2 text-sm">Discuss structural-biology research roles and cryo-EM work.</p><a className="mt-3 inline-flex min-h-11 items-center bg-ink px-5 text-sm text-cream" href="mailto:jackie.ng@atombios.com?subject=Research%20role%20and%20CV%20request">Discuss a role / request my CV ↗</a></div>
          <div><h3 className="font-heading text-2xl">For collaborators</h3><p className="mt-2 text-sm">Discuss LNP formulation data, model development or structural questions. Bring a research question and the measurements available.</p><a className="mt-3 inline-flex min-h-11 items-center border border-ink px-5 text-sm" href="mailto:jackie.ng@atombios.com?subject=Structural%20biology%20or%20LNP%20collaboration">Propose a collaboration ↗</a></div>
        </div>
      </div>
    </section>
  )
}
