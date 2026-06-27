import { useEffect, useState } from 'react'
import styles from './FlowerGuide.module.css'

interface FlowerGuideProps {
  progress: number
}

export function FlowerGuide({ progress }: FlowerGuideProps) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const listener = () => setReduced(query.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  const lift = progress * 26

  return (
    <div className={styles.guide} style={{ transform: `translate3d(0, ${-lift}px, 0)` }}>
      <svg
        className={reduced ? styles.staticFlower : styles.flower}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Una flor que te acompaña durante todo el recorrido"
      >
        <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <ellipse className={styles.petal} cx="60" cy="38" rx="13" ry="24" />
          <ellipse className={styles.petal} cx="60" cy="82" rx="13" ry="24" />
          <ellipse className={styles.petal} cx="38" cy="60" rx="24" ry="13" />
          <ellipse className={styles.petal} cx="82" cy="60" rx="24" ry="13" />
          <ellipse
            className={styles.petal}
            cx="44"
            cy="44"
            rx="14"
            ry="22"
            transform="rotate(45 44 44)"
          />
          <ellipse
            className={styles.petal}
            cx="76"
            cy="76"
            rx="14"
            ry="22"
            transform="rotate(45 76 76)"
          />
          <ellipse
            className={styles.petal}
            cx="76"
            cy="44"
            rx="14"
            ry="22"
            transform="rotate(-45 76 44)"
          />
          <ellipse
            className={styles.petal}
            cx="44"
            cy="76"
            rx="14"
            ry="22"
            transform="rotate(-45 44 76)"
          />
          <circle cx="60" cy="60" r="9" fill="currentColor" stroke="none" opacity="0.85" />
        </g>
      </svg>
    </div>
  )
}
