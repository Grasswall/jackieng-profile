'use client'

const names = [
  'the Lindau Nobel Laureate Meeting',
  'the Shaw Prize Forum',
  'HKSTP',
  'the Chinese Academy of Sciences',
  'Sirnaomics',
]

export function Proof() {
  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="bg-bg text-ink"
      style={{ paddingInline: 'var(--margin)', paddingBlock: 'clamp(4rem, 9vh, 6rem)' }}
      data-ink="dark"
    >
      <h2 id="proof-heading" className="sr-only">Who&apos;s in the room</h2>

      <p
        className="font-display font-medium"
        style={{ fontSize: 'clamp(1.6rem, 4.2vw, 3.4rem)', lineHeight: 1.15, maxWidth: '22ch' }}
        data-reveal
      >
        Selected by {names[0]}, invited to {names[1]}, funded by {names[2]}, named{' '}
        {names[3]} Future Leader, and building with {names[4]} on delivery.
      </p>
    </section>
  )
}
