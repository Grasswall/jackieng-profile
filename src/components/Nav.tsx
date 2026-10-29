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

export function Nav({ items }: NavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav
        className="flex items-start justify-between pointer-events-none"
        style={{ padding: 'var(--margin)' }}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="pointer-events-auto text-[15px] font-medium text-white hover:text-accent transition-colors duration-200 px-2.5 py-1 -mx-2.5 -my-1 rounded-sm backdrop-blur-md"
          style={{ backgroundColor: 'rgba(5, 15, 22, 0.92)' }}
          aria-label="Jackie Ng — home"
        >
          Jackie Ng
        </Link>

        <ul
          className="hidden md:flex items-center gap-6 pointer-events-auto px-3.5 py-1 rounded-sm backdrop-blur-md"
          style={{ backgroundColor: 'rgba(5, 15, 22, 0.92)' }}
          role="list"
        >
          {items.map((item) => {
            const href = item.href
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  className="link text-[15px] text-white hover:text-accent transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          className="md:hidden pointer-events-auto p-2.5 -mr-2.5 -my-1.5 text-white rounded-sm backdrop-blur-md focus-visible:outline-none"
          style={{ backgroundColor: 'rgba(5, 15, 22, 0.92)' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4 L18 18 M18 4 L4 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6 H19 M3 11 H19 M3 16 H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <div
        className={`md:hidden pointer-events-auto overflow-hidden transition-[max-height,opacity] duration-300 bg-bg ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col px-6 py-4 gap-4" role="list">
          {items.map((item) => {
            const href = item.href
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  className="block text-base text-ink hover:text-accent transition-colors duration-200 py-1"
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
