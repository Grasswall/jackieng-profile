'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const storyBlocks = [
  {
    title: 'The Problem',
    content:
      'The blood-brain barrier blocks most nanoparticle formulations. Conventional LNPs (80-100nm) are too large for efficient transcytosis and too visible to immune surveillance.',
  },
  {
    title: 'The Insight',
    content:
      'I started in structural biology, depositing cryo-EM structures at atomic resolution. Exceptional CNS therapeutics kept failing for the same reason: they couldn\u2019t cross the blood-brain barrier. So I pivoted to delivery.',
  },
  {
    title: 'The Platform',
    content:
      '20nm nanoparticles, 4-5\u00d7 smaller than conventional LNPs, built from structural biology insight into endosomal transcytosis. Validated 8\u00d7 BBB crossing and 3.2-fold brain accumulation vs. conventional LNPs.',
  },
]

export function StoryV4() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="story"
      className="bg-[#F5F5F0] py-20 md:py-32"
      aria-labelledby="story-heading"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2
          id="story-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1828] leading-[1.15] mb-12"
        >
          How I got here
        </h2>

        <div ref={containerRef} className="space-y-10">
          {storyBlocks.map((block, idx) => (
            <div key={idx} data-reveal>
              <h3 className="text-2xl font-semibold tracking-tight text-[#0A1828] mb-2">
                {block.title}
              </h3>
              <p className="text-[17px] leading-[1.7] text-[#334155]">
                {block.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
