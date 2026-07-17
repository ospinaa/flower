import { useState } from 'react'
import { RetoItem } from '../RetoItem/RetoItem'
import { RecompensaModal } from '../RecompensaModal/RecompensaModal'
import type { Dia } from '../../data/retos'
import styles from './DayCard.module.css'

interface DayCardProps {
  dia: Dia
  unlocked: boolean
  isCompleted: (id: string) => boolean
  countCompleted: (ids: string[]) => number
  comodinesRestantes: number
  isComodinActivo: (id: string) => boolean
  onToggle: (id: string) => void
  onUseComodin: (id: string) => void
}

export function DayCard({
  dia,
  unlocked,
  isCompleted,
  countCompleted,
  comodinesRestantes,
  isComodinActivo,
  onToggle,
  onUseComodin,
}: DayCardProps) {
  const [open, setOpen] = useState(false)
  const [showRecompensa, setShowRecompensa] = useState(false)

  const retoIds = dia.retos.map((r) => r.id)
  const completed = countCompleted(retoIds)
  const total = dia.retos.length
  const allDone = completed === total && total > 0
  const pct = total > 0 ? (completed / total) * 100 : 0

  function handleToggle(id: string) {
    const currentlyCompleted = isCompleted(id)
    onToggle(id)
    if (!currentlyCompleted && completed + 1 === total) {
      setShowRecompensa(true)
    }
  }

  return (
    <>
      <div className={[styles.card, unlocked ? styles.unlocked : styles.locked, allDone ? styles.allDone : ''].join(' ')}>
        <button
          type="button"
          className={styles.header}
          onClick={() => unlocked && setOpen((o) => !o)}
          aria-expanded={open}
          aria-disabled={!unlocked}
        >
          <div className={styles.headerLeft}>
            <span className={styles.lockIcon} aria-hidden="true">
              {!unlocked ? '🔒' : allDone ? '⭐' : '📅'}
            </span>
            <div>
              <span className={styles.dayLabel}>{dia.label}</span>
              {unlocked && <span className={styles.counter}>{completed}/{total} retos</span>}
            </div>
          </div>
          {unlocked && <span className={styles.chevron}>{open ? '▲' : '▼'}</span>}
        </button>

        {unlocked && (
          <div className={styles.progressTrack} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
        )}

        {unlocked && open && (
          <div className={styles.retos}>
            {dia.retos.map((reto) => (
              <RetoItem
                key={reto.id}
                id={reto.id}
                texto={reto.texto}
                completed={isCompleted(reto.id)}
                locked={false}
                comodinActivo={isComodinActivo(reto.id)}
                comodinesRestantes={comodinesRestantes}
                onToggle={handleToggle}
                onUseComodin={onUseComodin}
              />
            ))}
            {allDone && (
              <button type="button" className={styles.verRecompensa} onClick={() => setShowRecompensa(true)}>
                🎁 Ver recompensa del día
              </button>
            )}
          </div>
        )}

        {!unlocked && <p className={styles.lockedMsg}>Se desbloquea el {dia.label}</p>}
      </div>

      {showRecompensa && (
        <RecompensaModal
          titulo={dia.recompensa.titulo}
          descripcion={dia.recompensa.descripcion}
          emoji={dia.recompensa.emoji}
          onClose={() => setShowRecompensa(false)}
        />
      )}
    </>
  )
}