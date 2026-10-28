'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Entry {
  year: string
  label: string
}

const tracks: { title: string; color: string; entries: Entry[] }[] = [
  {
    title: 'Elite scientific access',
    color: '#22D3EE',
    entries: [
      { year: '2025', label: 'Lindau Nobel Laureate Meeting' },
      { year: '2025', label: 'Shaw Prize Forum' },
      { year: '', label: 'CAS Future Leader' },
      { year: '2024', label: 'Hong Kong Laureate Forum' },
      { year: '', label: 'São Paulo Advanced Science School' },
    ],
  },
  {
    title: 'Platform & funding',
    color: '#F97316',
    entries: [
      { year: '', label: 'HK$7.05M total funding secured' },
      { year: '', label: 'HKSTP Incu-Bio, HK$6M' },
      { year: '', label: '北大滙豐-劍橋嘉治 Hong Kong Champion' },
      { year: '', label: '贏在蘇州 Rising Star Award' },
      { year: '', label: "SUSS Pitch for Good — People's Choice" },
      { year: '', label: 'Techathon+ Gold Medal' },
    ],
  },
  {
    title: 'Media & speaking',
    color: '#A78BFA',
    entries: [
      { year: '', label: 'RTHK 尋找創科的故事 — featured' },
      { year: '', label: 'BRTV 轉在北京 — featured' },
      { year: '', label: 'Ming Pao, Sing Tao, HK01 coverage' },
      { year: '', label: 'Max Planck Institute RPG Forum — speaker' },
      { year: '', label: 'HK-Jiangsu Symposium on Drug Discovery — speaker' },
      { year: '', label: 'Shaw Laureates Roundtable — academic representative' },
    ],
  },
  {
    title: 'Technical foundation',
    color: '#34D399',
    entries: [
      { year: '2023–', label: 'PhD, PolyU — Drug Delivery & Structural Biology' },
      { year: '2024', label: 'J. Biological Chemistry — doi:10.1016/j.jbc.2024.107390' },
      { year: '2025', label: 'ABCT RPG Symposium — Best Oral Presentation' },
      { year: '', label: 'BSc Biochemistry, HKUST — First Class Honours, 4.0/4.3 GPA' },
      { year: '', label: 'Cryo-EM structures deposited in PDB/EMDB' },
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
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2
          id="validation-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
        >
          Validation
        </h2>
        <p className="text-lg text-[#94A3B8] font-light leading-[1.6] mb-16 max-w-[52ch]">
          Access, funding and wins, media and speaking, and training. Years appear only where the source gives one.
        </p>

        <div ref={containerRef} className="grid md:grid-cols-2 gap-x-16 gap-y-16">
          {tracks.map((track) => (
            <div key={track.title} data-reveal>
              <h3
                className="text-sm font-semibold tracking-[0.08em] uppercase mb-6"
                style={{ color: track.color }}
              >
                {track.title}
              </h3>
              <ol className="relative border-l pl-6" style={{ borderColor: `${track.color}33` }}>
                {track.entries.map((entry, i) => (
                  <li key={i} className="relative pb-6 last:pb-0">
                    <span
                      className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-[#0B0E14]"
                      style={{ backgroundColor: track.color }}
                      aria-hidden="true"
                    />
                    {entry.year && (
                      <span className="block text-xs font-mono text-[#64748B] mb-0.5">
                        {entry.year}
                      </span>
                    )}
                    <span className="text-[15px] leading-[1.5] text-[#E2E8F0]">
                      {entry.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
