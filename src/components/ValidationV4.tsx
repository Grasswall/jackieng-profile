'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const validationCards = [
  {
    title: 'Elite Scientific Access',
    items: [
      'Lindau Nobel Laureate Meeting 2025',
      'Shaw Prize Forum 2025',
      'Chinese Academy of Sciences Future Leader',
      'Hong Kong Laureate Forum 2024',
      'São Paulo Advanced Science School',
    ],
  },
  {
    title: 'Platform Validation',
    items: [
      'HKSTP Incu-Bio (HK$6M)',
      'HK$7.05M total funding secured',
      '北大滙豐-劍橋嘉治 Hong Kong Champion',
      '贏在蘇州 Rising Star Award',
      'SUSS Pitch for Good — People\'s Choice Award (Singapore)',
      'Techathon+ Gold Medal',
    ],
  },
  {
    title: 'Media & Speaking',
    items: [
      'RTHK 尋找創科的故事 (featured)',
      'BRTV 轉在北京 (featured)',
      'Ming Pao, Sing Tao, HK01 coverage',
      'Max Planck Institute RPG Forum — Speaker',
      'HK-Jiangsu Symposium on Drug Discovery — Speaker',
      'Shaw Laureates Roundtable — Academic Representative',
    ],
  },
  {
    title: 'Technical Foundation',
    items: [
      'PhD, PolyU — Drug Delivery & Structural Biology',
      'BSc Biochemistry, HKUST — First Class Honours, 4.0/4.3 GPA, 7× Dean\'s List',
      'J. Biological Chemistry (2024) — doi:10.1016/j.jbc.2024.107390',
      'Cryo-EM structures deposited in PDB/EMDB',
      'ABCT RPG Symposium Best Oral Presentation 2025',
    ],
  },
]

export function ValidationV4() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="validation"
      className="bg-[#0B0E14] py-20 md:py-32"
      aria-labelledby="validation-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2
          id="validation-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-12"
        >
          Validation
        </h2>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {validationCards.map((card, idx) => (
            <div
              key={idx}
              className="opacity-0 translate-y-8 bg-[#1E293B] border border-[#334155] rounded-xl p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[#22D3EE]"
              data-reveal
            >
              <h4 className="text-sm font-semibold tracking-[0.05em] uppercase text-[#22D3EE] mb-4">
                {card.title}
              </h4>
              <ul className="space-y-3">
                {card.items.map((item, iIdx) => (
                  <li
                    key={iIdx}
                    className="text-[15px] leading-[1.6] text-[#94A3B8] pl-5 relative before:content-['·'] before:absolute before:left-0 before:text-[#22D3EE] before:font-bold before:text-2xl before:leading-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
