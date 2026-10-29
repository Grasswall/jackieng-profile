'use client'

const rows = [
  { label: 'Email', value: 'jackie.ng@atombios.com', href: 'mailto:jackie.ng@atombios.com' },
  { label: 'LinkedIn', value: 'jackie-ng-computational-bio', href: 'https://www.linkedin.com/in/jackie-ng-computational-bio/' },
  { label: 'GitHub', value: 'Grasswall', href: 'https://github.com/Grasswall' },
]

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-bg text-ink"
      style={{ paddingInline: 'var(--margin)', paddingBlock: 'clamp(4rem, 9vh, 6rem)' }}
      data-ink="dark"
    >
      <h2
        id="contact-heading"
        className="font-display font-extrabold uppercase"
        style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', lineHeight: 0.95 }}
        data-reveal
      >
        Let&apos;s talk delivery.
      </h2>

      <div className="mt-14 md:mt-20 space-y-1">
        {rows.map((row) => (
          <a
            key={row.label}
            href={row.href}
            target={row.href.startsWith('http') ? '_blank' : undefined}
            rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group flex items-baseline justify-between gap-4 py-5 bg-surface px-5 hover:text-accent transition-colors duration-200"
            data-reveal
          >
            <span className="text-[14px] text-muted group-hover:text-accent transition-colors duration-200">
              {row.label}
            </span>
            <span
              className="font-display font-medium text-right"
              style={{ fontSize: 'clamp(1.1rem, 3vw, 2rem)' }}
            >
              {row.value}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
