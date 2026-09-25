'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export interface NavItem {
  label: string
  href: string
}

interface NavProps {
  items: NavItem[]
}

const basePath = '/jackieng-profile'

export function Nav({ items }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change / click-outside
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={basePath}
          className="text-offwhite font-heading text-2xl font-semibold tracking-tight hover:text-gold transition-colors duration-200"
          aria-label="Jackie Ng — home"
        >
          JN.
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {items.map((item) => {
            const href = item.href.startsWith('/')
              ? `${basePath}${item.href}`
              : item.href
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  className="text-sm tracking-wider text-offwhite/70 hover:text-gold transition-colors duration-200 uppercase font-medium"
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 text-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={[
              'block h-px w-6 bg-current transition-transform duration-300 origin-center',
              open ? 'translate-y-[7px] rotate-45' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block h-px w-6 bg-current transition-opacity duration-300',
              open ? 'opacity-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block h-px w-6 bg-current transition-transform duration-300 origin-center',
              open ? '-translate-y-[7px] -rotate-45' : '',
            ].join(' ')}
          />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={[
          'md:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          'bg-navy/98 backdrop-blur-md border-b border-white/10',
        ].join(' ')}
        aria-hidden={!open}
      >
        <ul className="flex flex-col px-6 py-4 gap-4" role="list">
          {items.map((item) => {
            const href = item.href.startsWith('/')
              ? `${basePath}${item.href}`
              : item.href
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  className="block text-base tracking-wider text-offwhite/80 hover:text-gold transition-colors duration-200 uppercase font-medium py-1"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
