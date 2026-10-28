'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Source {
  label: string
  url: string
}

interface OrganRule {
  organ: string
  status: 'Published rule' | 'Research direction'
  strategy: string
  mechanism: string
  knobs: Array<{ name: string; setting: string }>
  caveat: string
  sources: Source[]
}

const SORT_PAPER: Source = {
  label: 'Selective organ targeting (SORT) nanoparticles, Nat. Nanotechnol. 2020',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7735425',
}
const SORT_MECH: Source = {
  label: 'On the mechanism of tissue-specific mRNA delivery by SORT nanoparticles, PNAS',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8719871',
}
const APOE_REVIEW: Source = {
  label: 'ApoE functionalization of nanoparticles for delivery across the BBB (review)',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7116687/',
}

const rules: OrganRule[] = [
  {
    organ: 'Liver',
    status: 'Published rule',
    strategy: 'Add an ionizable cationic SORT lipid to the four-component LNP.',
    mechanism:
      'In the SORT system, liver delivery depends on ApoE. Adding an anionic or permanently cationic lipid removes that dependence.',
    knobs: [
      { name: 'SORT molecule', setting: 'Ionizable cationic lipid' },
      { name: 'Corona dependence', setting: 'ApoE-dependent' },
    ],
    caveat:
      'The SORT papers report that both the lipid chemistry and the amount added change the outcome. The rule gives a direction, not an exact recipe.',
    sources: [SORT_PAPER, SORT_MECH],
  },
  {
    organ: 'Lung',
    status: 'Published rule',
    strategy: 'Add a permanently cationic lipid (DOTAP, DDAB or EPC).',
    mechanism:
      'Protein expression shifted from liver to spleen to lung as the DOTAP percentage rose. Delivery is ApoE-independent.',
    knobs: [
      { name: 'SORT molecule', setting: 'Permanently cationic, quaternary ammonium headgroup' },
      { name: 'Published example', setting: 'DOTAP at 50 mol% in 4A3-SC8 LNPs' },
      { name: 'Corona dependence', setting: 'ApoE-independent' },
    ],
    caveat:
      'The 50 mol% figure comes from one published lipid system and does not transfer to other formulations.',
    sources: [SORT_PAPER, SORT_MECH],
  },
  {
    organ: 'Spleen',
    status: 'Published rule',
    strategy: 'Add an anionic lipid (14PA, 18BMP or 18PA).',
    mechanism:
      'All anionic SORT lipids tested gave the same spleen-selective profile. Delivery is ApoE-independent.',
    knobs: [
      { name: 'SORT molecule', setting: 'Anionic lipid' },
      { name: 'Corona dependence', setting: 'ApoE-independent' },
    ],
    caveat:
      'Reported for mRNA delivery. The sources I read do not cover other cargo types.',
    sources: [SORT_PAPER, SORT_MECH],
  },
  {
    organ: 'Brain',
    status: 'Research direction',
    strategy:
      'No SORT-style rule exists for brain. The route in the literature is ApoE functionalization to engage LDL-receptor transcytosis at the BBB.',
    mechanism:
      'ApoE on the particle surface is recognized by LDL-family receptors, and the particle is carried across by receptor-mediated transcytosis.',
    knobs: [
      { name: 'Surface ligand', setting: 'ApoE' },
      { name: 'Particle size', setting: 'The AtomBios platform is 20 nm' },
      { name: 'Open question', setting: 'How the serum protein corona changes brain uptake' },
    ],
    caveat:
      'The review concludes that stealth properties alone may not be sufficient for effective brain targeting. How the serum protein corona changes brain uptake is an open problem. No model or corona dataset is shown here.',
    sources: [APOE_REVIEW],
  },
]

export function MLPredictor() {
  const containerRef = useScrollReveal()
  const [selected, setSelected] = useState('Brain')
  const current = rules.find((r) => r.organ === selected) ?? rules[0]
  const isDirection = current.status === 'Research direction'

  return (
    <section
      id="design-rules"
      className="bg-[#0B0E14] py-20 md:py-32"
      aria-labelledby="rules-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-12">
          <div data-reveal>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-wide text-[#F97316] bg-[#F97316]/10 rounded-full border border-[#F97316]/20 mb-4">
              Literature-based rules. Not a trained model.
            </span>
            <h2
              id="rules-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              Where the field stands on organ targeting
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              Selective organ targeting for lung, spleen and liver follows
              published design rules. Brain does not. Pick an organ to see the
              rule, the mechanism and the source.
            </p>
          </div>

          <div data-reveal className="grid md:grid-cols-[280px_1fr] gap-8">
            <div className="border border-[#1E293B] bg-[#0F172A]/80 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-[#94A3B8] uppercase tracking-wide mb-4">
                Target organ
              </h3>
              <div className="space-y-2">
                {rules.map((r) => (
                  <button
                    key={r.organ}
                    onClick={() => setSelected(r.organ)}
                    aria-pressed={selected === r.organ}
                    className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                      selected === r.organ
                        ? 'bg-[#22D3EE]/20 border-2 border-[#22D3EE] text-[#F8FAFC]'
                        : 'bg-[#1E293B] border-2 border-transparent text-[#94A3B8] hover:border-[#334155] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {r.organ}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#1E293B] bg-[#0F172A]/80 rounded-2xl p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-semibold text-[#F8FAFC]">
                  {current.organ}
                </h3>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${
                    isDirection
                      ? 'text-[#F97316] border-[#F97316]/30 bg-[#F97316]/10'
                      : 'text-[#22D3EE] border-[#22D3EE]/30 bg-[#22D3EE]/10'
                  }`}
                >
                  {current.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#22D3EE] uppercase tracking-wide mb-2">
                  Strategy
                </h4>
                <p className="text-[#F8FAFC]">{current.strategy}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#22D3EE] uppercase tracking-wide mb-2">
                  Mechanism
                </h4>
                <p className="text-[#94A3B8]">{current.mechanism}</p>
              </div>

              <dl className="grid sm:grid-cols-2 gap-3">
                {current.knobs.map((k) => (
                  <div key={k.name} className="bg-[#1E293B] rounded-xl p-4">
                    <dt className="text-xs uppercase tracking-wide text-[#94A3B8] mb-1">
                      {k.name}
                    </dt>
                    <dd className="text-[#F8FAFC]">{k.setting}</dd>
                  </div>
                ))}
              </dl>

              <p className="text-sm text-[#94A3B8] border-l-2 border-[#F97316] pl-4">
                <span className="text-[#F97316] font-medium">Caveat: </span>
                {current.caveat}
              </p>

              <div>
                <h4 className="text-sm font-medium text-[#22D3EE] uppercase tracking-wide mb-2">
                  Sources
                </h4>
                <ul className="space-y-1">
                  {current.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#22D3EE] underline underline-offset-4 hover:text-[#F8FAFC]"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p
            data-reveal
            className="text-center text-sm text-[#94A3B8] max-w-3xl mx-auto"
          >
            This section summarizes what others have published. It does not
            show a trained model or data from the AtomBios platform.
          </p>
        </div>
      </div>
    </section>
  )
}
