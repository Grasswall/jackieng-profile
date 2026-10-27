'use client'
import { createContext, useContext, useEffect, useRef } from 'react'
import type Lenis from 'lenis'

type LenisContextType = {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    // Dynamic import to avoid SSR issues
    import('lenis').then(({ default: LenisClass }) => {
      const lenis = new LenisClass({
        autoRaf: true,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        syncTouch: false,
        anchors: true,
      } as ConstructorParameters<typeof LenisClass>[0])

      lenisRef.current = lenis
    })

    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  )
}
