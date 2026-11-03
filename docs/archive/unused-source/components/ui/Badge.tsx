import { HTMLAttributes } from 'react'

type BadgeVariant = 'gold' | 'outline' | 'muted'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

// Solid chips only: no outlines, no tints.
const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-cream text-ink font-medium',
  outline: 'bg-ink text-cream font-medium',
  muted: 'bg-deep2 text-cream font-medium',
}

export function Badge({ variant = 'gold', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={['inline-flex items-center px-3 py-1 text-sm', variantClasses[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
