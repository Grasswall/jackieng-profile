interface SectionLabelProps {
  label: string
  className?: string
  lineColor?: 'gold' | 'white'
}

export function SectionLabel({
  label,
  className = '',
  lineColor = 'gold',
}: SectionLabelProps) {
  const lineClass = lineColor === 'gold' ? 'bg-gold' : 'bg-white/30'

  return (
    <div
      className={['flex items-center gap-4', className].filter(Boolean).join(' ')}
    >
      <span className={['block h-px w-8 shrink-0', lineClass].join(' ')} />
      <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
