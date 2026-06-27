import { useEffect } from 'react'
import styles from './PhotoModal.module.css'

interface PhotoModalProps {
  src: string
  caption: string
  onClose: () => void
}

export function PhotoModal({ src, caption, onClose }: PhotoModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.frame} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <img src={src} alt="" className={styles.photo} />
        <p className={styles.caption}>{caption}</p>
      </div>
    </div>
  )
}
