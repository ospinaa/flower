import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import styles from './Particles.module.css'

const PARTICLE_COUNT = 20

interface Particle {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 14 + Math.random() * 10,
    delay: Math.random() * -20,
    drift: -30 + Math.random() * 60,
  }))
}

export function Particles() {
  const particles = useMemo(() => createParticles(PARTICLE_COUNT), [])

  return (
    <div className={styles.layer} aria-hidden="true">
      {particles.map((particle) => {
        const style = {
          left: `${particle.left}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDuration: `${particle.duration}s`,
          animationDelay: `${particle.delay}s`,
          '--drift': `${particle.drift}px`,
        } as CSSProperties

        return <span key={particle.id} className={styles.particle} style={style} />
      })}
    </div>
  )
}
