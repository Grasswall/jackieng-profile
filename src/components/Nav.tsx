'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavItem {
  label: string
  href: string
}

interface NavProps {
  items: NavItem[]
}

// next/link prepends the configured basePath itself, so hrefs here must stay
// site-relative ("/about", "/#contact") and never include "/jackieng-profile".
export function Nav({ items: pageItems }: NavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const here = (pathname || '/').replace(/\/$/, '') || '/'
  const isHome = here === '/' || here === '/jackieng-profile'
  const items = isHome ? [
    { label: 'Founder', href: '/#founder' },
    { label: 'Evidence', href: '/#evidence' },
    { label: 'Work map', href: '/#work-index' },
    { label: 'Contact', href: 'mailto:jackie.ng@atombios.com' },
  ] : pageItems
  const isCurrent = (href: string) => !href.includes('#') && href === here

  // Close the menu after any navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Escape and outside-press close the open menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  // A closed menu is removed from the tab order and the accessibility tree.
  const menuGuard = (open ? {} : { inert: '' }) as Record<string, unknown>

  return (
    <header ref={headerRef} className="on-dark fixed top-0 left-0 right-0 z-50 bg-deep text-cream">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-12"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex min-h-11 items-center font-heading text-3xl font-semibold tracking-tight text-cream hover:text-signal"
          aria-label="Jackie Ng, home"
        >
          JN.
        </Link>

        <ul className="hidden items-center gap-2 md:flex" role="list">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                className={[
                  'flex min-h-11 items-center px-3 text-base text-cream underline-offset-[10px] decoration-2 transition-colors hover:text-signal',
                  isCurrent(item.href) ? 'underline decoration-signal' : '',
                ].join(' ')}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-3 flex h-12 w-12 items-center justify-center text-cream md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span
              className={[
                'absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300',
                open ? 'top-[7px] rotate-45' : 'top-0',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-0 top-[7px] block h-0.5 w-6 bg-current transition-opacity duration-300',
                open ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300',
                open ? 'top-[7px] -rotate-45' : 'top-[14px]',
              ].join(' ')}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        {...menuGuard}
        className={[
          'absolute left-0 right-0 top-full bg-deep md:hidden transition-[opacity,visibility] duration-200',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        ].join(' ')}
      >
        <ul className="flex flex-col px-6 pb-6 pt-2" role="list">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={[
                  'flex min-h-14 items-center font-heading text-3xl text-cream hover:text-signal',
                  isCurrent(item.href) ? 'underline decoration-signal decoration-2 underline-offset-8' : '',
                ].join(' ')}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
