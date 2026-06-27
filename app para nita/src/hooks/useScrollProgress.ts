import { useEffect, useRef, useState } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const value = maxScroll > 0 ? clamp01(scrollTop / maxScroll) : 0
      setProgress(value)
      frame.current = null
    }

    const onScroll = () => {
      if (frame.current === null) {
        frame.current = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  return progress
}

function clamp01(value: number): number {
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}
