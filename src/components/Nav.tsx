'use client'

import { useState, useEffect } from 'react'

export interface NavItem {
  label: string
  href: string
}

interface NavProps {
  items: NavItem[]
}

export function Nav({ items }: NavProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav 
        className="site-nav" 
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
          backgroundColor: scrolled ? 'rgba(11, 14, 20, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(148, 163, 184, 0.1)' : 'none',
        }}
      >
        <div className="site-nav__inner" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem',
        }}>
          <a 
            href="#" 
            className="site-nav__name"
            style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--text)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text)'}
          >
            Jackie Ng
          </a>

          {/* Desktop links */}
          <ul 
            className="site-nav__links site-nav__links--desktop" 
            role="list"
            style={{
              display: 'flex',
              gap: '2rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {items.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href}
                  style={{
                    color: 'var(--text)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text)'}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="site-nav__hamburger"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: 'var(--text)',
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="site-nav__mobile"
            style={{
              position: 'fixed',
              top: '4rem',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(11, 14, 20, 0.98)',
              backdropFilter: 'blur(12px)',
              padding: '2rem',
            }}
          >
            <ul
              role="list"
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    style={{
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      display: 'block',
                    }}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .site-nav__links--desktop {
            display: none !important;
          }
          .site-nav__hamburger {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .site-nav__mobile {
            display: none !important;
          }
        }
      `}} />
    </>
  )
}
