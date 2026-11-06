import { useEffect } from 'react'

/**
 * Shared behaviour for modal layers (menu, search, bag):
 * locks page scroll and closes on Escape while `active`.
 */
export function useOverlay(active, onClose) {
  useEffect(() => {
    if (!active) return
    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      window.removeEventListener('keydown', onKey)
    }
  }, [active, onClose])
}
