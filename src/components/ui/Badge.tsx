import { HTMLAttributes } from 'react'

type BadgeVariant = 'gold' | 'outline' | 'muted'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-gold text-navy font-semibold',
  outline: 'bg-transparent text-gold border border-gold font-medium',
  muted: 'bg-white/10 text-slate font-medium',
}

export function Badge({
  variant = 'gold',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        'inline-flex items-center',
        'px-3 py-1 rounded-full text-xs tracking-widest uppercase',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
