'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const storyBlocks = [
  {
    title: 'The Problem',
    content: [
      '99% of systemically delivered drugs fail to reach the brain. The blood-brain barrier blocks large molecules, traps conventional LNPs in endosomes, and clears therapeutics before they act.',
      'Standard lipid nanoparticles (80-100nm) are too large for efficient transcytosis and too visible to immune surveillance. CNS delivery remains the hardest problem in drug development.',
    ],
  },
  {
    title: 'The Insight',
    content: [
      'I started in structural biology — depositing novel cryo-EM structures, understanding protein mechanisms at atomic resolution. But the pattern was clear: exceptional CNS therapeutics fail because they can\'t cross the blood-brain barrier.',
      'So I pivoted to brain delivery engineering. I applied structural biology insights into endosomal transcytosis, designed 20nm nanoparticles small enough to evade immune surveillance, and validated 8× BBB crossing vs. conventional LNPs.',
    ],
  },
  {
    title: 'The Platform',
    content: [
      '20nm — 4-5× smaller than conventional LNPs. Below immune surveillance thresholds. Optimized for blood-brain barrier transcytosis.',
      'Research direction: AI-guided formulation design via protein corona engineering. The corona determines biodistribution more than synthetic surface properties — understanding it mechanistically could enable programmable organ targeting beyond the brain.',
    ],
    list: [
      '8× blood-brain barrier transcytosis vs. conventional LNPs (validated)',
      '3.2-fold brain accumulation in vivo (p<0.01)',
      'Validated by Sirnaomics partnership (~$100M market cap)',
      'HK$7.05M funded (HKSTP Incu-Bio, PolyU IEP)',
    ],
  },
]

export function StoryV4() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="story"
      className="bg-[#0F172A] py-20 md:py-32"
      aria-labelledby="story-heading"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2
          id="story-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-12"
        >
          How I got here
        </h2>

        <div ref={containerRef} className="space-y-16">
          {storyBlocks.map((block, idx) => (
            <div key={idx} className="opacity-0 translate-y-8" data-reveal>
              <h3 className="text-2xl font-semibold tracking-tight text-[#F8FAFC] mb-4">
                {block.title}
              </h3>
              {block.content.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-[17px] leading-[1.7] text-[#94A3B8] mb-4"
                >
                  {para.includes('The delivery system is.') ? (
                    <>
                      {para.split('The delivery system is.')[0]}
                      <span className="inline-block font-semibold text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded">
                        The delivery system is.
                      </span>
                    </>
                  ) : para.includes('better delivery') ? (
                    <>
                      {para.split('better delivery')[0]}
                      <span className="inline-block font-semibold text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded">
                        better delivery
                      </span>
                      {para.split('better delivery')[1]}
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}
              {block.list && (
                <ul className="mt-6 space-y-3">
                  {block.list.map((item, lIdx) => (
                    <li
                      key={lIdx}
                      className="text-[16px] leading-[1.6] text-[#94A3B8] pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-[#22D3EE] before:font-semibold"
                    >
                      <strong className="font-medium">{item.split(' (')[0]}</strong>
                      {item.includes(' (') && ` (${item.split(' (')[1]}`}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
