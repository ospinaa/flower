import { DIAS, isDiaUnlocked } from '../../data/retos'
import { useRetosProgress, MAX_COMODINES } from '../../hooks/useRetosProgress'
import { DayCard } from '../../components/DayCard/DayCard'
import styles from './RetosPage.module.css'

export function RetosPage() {
  const {
    toggle,
    isCompleted,
    countCompleted,
    comodinesRestantes,
    isComodinActivo,
    useComodin,
  } = useRetosProgress()

  const totalRetos = DIAS.flatMap((d) => d.retos).length
  const totalCompleted = DIAS.flatMap((d) => d.retos).filter((r) => isCompleted(r.id)).length
  const globalPct = Math.round((totalCompleted / totalRetos) * 100)

  return (
    <div className={styles.page}>
      <div className={styles.flowerLayer} aria-hidden="true" />

      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>del 10 al 14 de agosto</span>
          <h1 className={styles.title}>Nuestro juego</h1>
          <p className={styles.subtitle}>
            Cada día se desbloquean 3 retos. Complétalos juntos y gana tu recompensa.
          </p>
        </header>

        {/* Contador de comodines */}
        <div className={styles.comodinBadge}>
          <span className={styles.comodinIcon}>🃏</span>
          <div className={styles.comodinInfo}>
            <span className={styles.comodinLabel}>Comodines disponibles</span>
            <div className={styles.comodinPips}>
              {Array.from({ length: MAX_COMODINES }).map((_, i) => (
                <span
                  key={i}
                  className={[styles.pip, i < comodinesRestantes ? styles.pipActive : styles.pipUsed].join(' ')}
                />
              ))}
            </div>
          </div>
          <span className={styles.comodinCount}>{comodinesRestantes}/{MAX_COMODINES}</span>
        </div>

        {/* Progreso global */}
        <div className={styles.globalProgress}>
          <div className={styles.globalLabel}>
            <span>Progreso total</span>
            <span>{globalPct}%</span>
          </div>
          <div className={styles.globalTrack}>
            <div className={styles.globalFill} style={{ width: `${globalPct}%` }} />
          </div>
        </div>

        {/* Cards por día */}
        <div className={styles.days}>
          {DIAS.map((dia) => (
            <DayCard
              key={dia.id}
              dia={dia}
              unlocked={isDiaUnlocked(dia)}
              isCompleted={isCompleted}
              countCompleted={countCompleted}
              comodinesRestantes={comodinesRestantes}
              isComodinActivo={isComodinActivo}
              onToggle={toggle}
              onUseComodin={useComodin}
            />
          ))}
        </div>
      </main>
    </div>
  )
}