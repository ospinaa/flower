import { useState } from 'react'
import { MAX_COMODINES } from '../../hooks/useRetosProgress'
import styles from './RetoItem.module.css'

interface RetoItemProps {
  id: string
  texto: string
  completed: boolean
  locked: boolean
  comodinActivo: boolean
  comodinesRestantes: number
  onToggle: (id: string) => void
  onUseComodin: (id: string) => void
}

export function RetoItem({
  id,
  texto,
  completed,
  locked,
  comodinActivo,
  comodinesRestantes,
  onToggle,
  onUseComodin,
}: RetoItemProps) {
  const [confirmando, setConfirmando] = useState(false)

  const puedeUsarComodin = !comodinActivo && !completed && comodinesRestantes > 0

  const textoFinal = comodinActivo
    ? '🃏 Reto libre — escojan juntos qué actividad hacer hoy'
    : texto

  if (confirmando) {
    return (
      <div className={styles.confirmBox}>
        <p className={styles.confirmText}>
          ¿Usar un comodín aquí? Te {comodinesRestantes === 1 ? 'queda' : 'quedan'}{' '}
          <strong>{comodinesRestantes}</strong> de {MAX_COMODINES}.
        </p>
        <div className={styles.confirmBtns}>
          <button
            type="button"
            className={styles.confirmYes}
            onClick={() => { onUseComodin(id); setConfirmando(false) }}
          >
            Sí, usar
          </button>
          <button
            type="button"
            className={styles.confirmNo}
            onClick={() => setConfirmando(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={[styles.row, comodinActivo ? styles.comodinRow : ''].join(' ')}>
      <button
        type="button"
        className={[styles.item, completed ? styles.done : '', locked ? styles.locked : ''].join(' ')}
        onClick={() => !locked && onToggle(id)}
        aria-pressed={completed}
        aria-disabled={locked}
      >
        <span className={styles.check} aria-hidden="true">
          {completed ? '✓' : comodinActivo ? '🃏' : '○'}
        </span>
        <span className={styles.texto}>{textoFinal}</span>
      </button>

      {puedeUsarComodin && (
        <button
          type="button"
          className={styles.comodinBtn}
          onClick={() => setConfirmando(true)}
          aria-label="Usar comodín en este reto"
          title={`Comodines restantes: ${comodinesRestantes}`}
        >
          🃏
        </button>
      )}
    </div>
  )
}