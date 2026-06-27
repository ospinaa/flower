import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { triangleWave } from '../../utils/math'
import type { NarrativeSection } from '../../data/sections'
import styles from './Background.module.css'

interface BackgroundProps {
  sections: NarrativeSection[]
  progress: number
  photos: string[]
  onPhotoTap: (src: string, caption: string) => void
}

interface RenderSlot {
  key: string
  src: string
  top: string
  left: string
  width: string
  rotate: number
  blur: number
  opacity: number
  translateY: number
  interactive: boolean
  caption?: string
}

export function Background({ sections, progress, photos, onPhotoTap }: BackgroundProps) {
  const slots = useMemo<RenderSlot[]>(() => {
    if (photos.length === 0) return []

    const total = sections.length
    const bandSize = 1 / total
    const overlap = bandSize * 0.6

    const result: RenderSlot[] = []

    sections.forEach((section, sectionIndex) => {
      const start = sectionIndex * bandSize - overlap
      const peakIn = sectionIndex * bandSize + bandSize * 0.15
      const peakOut = sectionIndex * bandSize + bandSize * 0.85
      const end = (sectionIndex + 1) * bandSize + overlap
      const visibility = triangleWave(progress, start, peakIn, peakOut, end)

      if (visibility <= 0.01) return

      const center = (sectionIndex + 0.5) * bandSize
      const drift = (progress - center) * 40

      section.photos.forEach((slot) => {
        const src = photos[slot.poolIndex % photos.length]

        result.push({
          key: `${section.id}-${slot.id}`,
          src,
          top: slot.top,
          left: slot.left,
          width: slot.width,
          rotate: slot.rotate,
          blur: 0,
          opacity: visibility * (slot.maxOpacity ?? 0.8),
          translateY: drift * 0.4,
          interactive: Boolean(slot.interactive),
          caption: slot.caption,
        })
      })
    })

    return result
  }, [sections, progress, photos])

  return (
    <div className={styles.layer}>
      {slots.map((slot) => {
        const style: CSSProperties = {
          top: slot.top,
          left: slot.left,
          width: slot.width,
          opacity: slot.opacity,
          transform: `translate3d(0, ${slot.translateY}px, 0) rotate(${slot.rotate}deg)`,
          filter: `blur(${slot.blur}px)`,
        }

        if (!slot.interactive) {
          return (
            <div key={slot.key} className={styles.frame} style={style}>
              <span className={styles.float}>
                <img src={slot.src} alt="" loading="lazy" />
              </span>
            </div>
          )
        }

        return (
          <div
            key={slot.key}
            className={`${styles.frame} ${styles.interactive}`}
            style={style}
            role="button"
            tabIndex={0}
            onClick={() => slot.caption && onPhotoTap(slot.src, slot.caption)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                if (slot.caption) onPhotoTap(slot.src, slot.caption)
              }
            }}
          >
            <span className={styles.float}>
              <img src={slot.src} alt="" loading="lazy" />
            </span>
          </div>
        )
      })}
    </div>
  )
}
