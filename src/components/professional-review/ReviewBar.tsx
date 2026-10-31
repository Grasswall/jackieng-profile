import Link from 'next/link'
import styles from './Review.module.css'

export type ReviewKey = 'hub' | 'a' | 'b' | 'c'

const ITEMS: { key: ReviewKey; href: string; label: string; short: string }[] = [
  { key: 'hub', href: '/professional-review/', label: 'Review hub', short: 'Hub' },
  { key: 'a', href: '/professional-review/a/', label: 'A · Editorial scientist', short: 'A' },
  { key: 'b', href: '/professional-review/b/', label: 'B · Research dossier', short: 'B' },
  { key: 'c', href: '/professional-review/c/', label: 'C · Founder-scientist narrative', short: 'C' },
]

// Preview-only strip. It sits in the page flow below the global nav and is not part of any design.
export function ReviewBar({ current }: { current: ReviewKey }) {
  return (
    <nav aria-label="Design previews" className={styles.bar}>
      <p className={styles.barTag}>Preview · homepage unchanged</p>
      <ul className={styles.barList}>
        {ITEMS.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className={styles.barLink}
              aria-current={item.key === current ? 'page' : undefined}
            >
              <span className={styles.barFull}>{item.label}</span>
              <span className={styles.barShort} aria-hidden="true">{item.short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
