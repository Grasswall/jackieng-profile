'use client'

import { useCallback, useRef, type KeyboardEvent } from 'react'

// Roving-tabindex keyboard support for a tablist: arrows, Home, End.
// Selection follows focus, so keyboard and pointer users see the same panel.
export function useTabKeys(count: number, select: (index: number) => void) {
  const refs = useRef<(HTMLElement | null)[]>([])

  const setRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      refs.current[index] = el
    },
    []
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent, index: number) => {
      let next = index
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          next = (index + 1) % count
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          next = (index - 1 + count) % count
          break
        case 'Home':
          next = 0
          break
        case 'End':
          next = count - 1
          break
        default:
          return
      }
      event.preventDefault()
      select(next)
      refs.current[next]?.focus()
    },
    [count, select]
  )

  return { setRef, onKeyDown }
}
