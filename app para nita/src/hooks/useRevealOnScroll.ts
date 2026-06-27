import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element once it enters the viewport and keeps it visible
 * forever after — it never fades back out as the user keeps scrolling.
 */
export function useRevealOnScroll<T extends Element>(threshold = 0.25) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}