'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const storyBlocks = [
  {
    title: 'The Problem',
    content: [
      'More than 99% of drugs injected into the bloodstream never reach their target. They get trapped in endosomes, blocked by the blood-brain barrier, or cleared before they can act.',
      'Conventional lipid nanoparticles (LNPs) are 80-100nm — too large for efficient transcytosis, too visible to immune surveillance. The drug isn\'t\'t the problem. The delivery system is.',
    ],
  },
  {
    title: 'The Insight',
    content: [
      'I started in structural biology — cryo-EM, PDB deposits, molecular mechanisms. But I kept seeing the same pattern: we understand the target, we have the molecule, and it still doesn\'t work in vivo.',
      'So I pivoted. Not to better drugs, but to better delivery. I used structural biology insights into endosomal sorting, AI-directed formulation optimization, and first-principles engineering to build a 20nm programmable nanoliposome platform.',
    ],
  },
  {
    title: 'The Platform',
    content: [
      '4-5× smaller than conventional LNPs. Below immune surveillance thresholds. Optimized for transcytosis.',
    ],
    list: [
      '8× blood-brain barrier transcytosis efficiency (vs. conventional LNPs)',
      '3.2-fold brain accumulation (p<0.01)',
      'Enhanced penetration via size-dependent EPR effect',
      'Reduced immunogenicity below surveillance thresholds',
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
