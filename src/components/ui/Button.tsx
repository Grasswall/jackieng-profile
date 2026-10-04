import { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-navy font-semibold border border-gold hover:bg-gold/90 active:bg-gold/80 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5',
  secondary:
    'bg-transparent text-gold font-semibold border border-gold hover:bg-gold/10 active:bg-gold/20 hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-offwhite font-medium border border-transparent hover:border-offwhite/30 hover:bg-white/5 hover:text-gold',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm tracking-wide',
  md: 'px-6 py-3 text-base tracking-wide',
  lg: 'px-8 py-4 text-lg tracking-wide',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}
