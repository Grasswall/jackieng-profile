interface SectionLabelProps {
  label: string
  className?: string
  lineColor?: 'gold' | 'white'
}

// Plain sentence-case kicker: a short rule and the section name.
export function SectionLabel({ label, className = '', lineColor = 'gold' }: SectionLabelProps) {
  return (
    <div className={['flex items-center gap-4', className].filter(Boolean).join(' ')}>
      <span className={['block h-0.5 w-8 shrink-0', lineColor === 'white' ? 'bg-cream' : 'bg-clay'].join(' ')} aria-hidden="true" />
      <span className="text-base font-medium">{label}</span>
    </div>
  )
}
