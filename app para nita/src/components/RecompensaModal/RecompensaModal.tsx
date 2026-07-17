import { useEffect } from 'react'
import styles from './RecompensaModal.module.css'

interface RecompensaModalProps {
  titulo: string
  descripcion: string
  emoji: string
  onClose: () => void
}

export function RecompensaModal({ titulo, descripcion, emoji, onClose }: RecompensaModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <span className={styles.emoji}>{emoji}</span>
        <h2 className={styles.titulo}>{titulo}</h2>
        <p className={styles.descripcion}>{descripcion}</p>
        <button type="button" className={styles.btn} onClick={onClose}>¡Genial!</button>
      </div>
    </div>
  )
}