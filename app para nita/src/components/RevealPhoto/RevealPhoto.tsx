import type { CSSProperties } from 'react'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import styles from './RevealPhoto.module.css'

interface RevealPhotoProps {
  src: string
  top: string
  left: string
  width: string
  rotate: number
  blur?: number
  zIndex?: number
  maxOpacity?: number
  tape?: boolean
  interactive?: boolean
  caption?: string
  onTap?: (src: string, caption: string) => void
}

export function RevealPhoto({
  src,
  top,
  left,
  width,
  rotate,
  zIndex = 2,
  maxOpacity = 1,
  tape,
  interactive,
  caption,
  onTap,
}: RevealPhotoProps) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>()

  const style = {
    top,
    left,
    width,
    zIndex,
    '--rotate': `${rotate}deg`,
    '--max-opacity': maxOpacity,
  } as CSSProperties

  const className = `${styles.frame} ${visible ? styles.visible : ''} ${
    interactive ? styles.interactive : ''
  }`

  const content = (
    <>
      {tape && <span className={styles.tape} aria-hidden="true" />}
      <span className={styles.float}>
        <div className={styles.inner}>
          {src ? (
            <img src={src} alt="" loading="lazy" />
          ) : (
            <div className={styles.placeholder}>♥</div>
          )}
        </div>
      </span>
    </>
  )

  if (!interactive || !src) {
    return (
      <div ref={ref} className={className} style={style}>
        {content}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      role="button"
      tabIndex={0}
      onClick={() => caption && onTap?.(src, caption)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          if (caption) onTap?.(src, caption)
        }
      }}
    >
      {content}
    </div>
  )
}
