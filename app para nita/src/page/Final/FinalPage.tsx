import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DIAS } from '../../data/retos'
import { useRetosProgress } from '../../hooks/useRetosProgress'
import styles from './FinalPage.module.css'
import fotoPropuesta from '../../assets/photos/10.jpeg'

export function FinalPage() {
  const navigate = useNavigate()
  const { isCompleted } = useRetosProgress()
  const [visible, setVisible] = useState(false)

  const totalRetos = DIAS.flatMap((d) => d.retos).length
  const totalCompleted = DIAS.flatMap((d) => d.retos).filter((r) => isCompleted(r.id)).length
  const allDone = totalCompleted === totalRetos

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  if (!allDone) {
    return (
      <div className={styles.page}>
        <div className={styles.flowerLayer} aria-hidden="true" />
        <main className={`${styles.main} ${visible ? styles.visible : ''}`}>
          <span className={styles.lockEmoji}>🔒</span>
          <h1 className={styles.lockedTitle}>Todavía no...</h1>
          <p className={styles.lockedText}>
            Esta página se desbloquea cuando completen todos los retos del 10 al 14 de agosto.
            ¡Faltan <strong>{totalRetos - totalCompleted}</strong> retos!
          </p>
          <button type="button" className={styles.backBtn} onClick={() => navigate('/retos')}>
            Ir a los retos →
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.flowerLayer} aria-hidden="true" />
      <div className={styles.confetti} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={styles.confettiPiece} style={{
            left: `${(i * 5.8) % 100}%`,
            animationDelay: `${(i * 0.18) % 2}s`,
            animationDuration: `${2.5 + (i % 4) * 0.4}s`,
          }} />
        ))}
      </div>

      <main className={`${styles.main} ${visible ? styles.visible : ''}`}>
        <span className={styles.crown}>👑</span>

        <header className={styles.header}>
          <span className={styles.eyebrow}>10 — 14 de agosto</span>
          <h1 className={styles.title}>¡Lo lograron!</h1>
          <p className={styles.subtitle}>
            Completaron cada reto, cada día, juntos. Eso no es poca cosa.
          </p>
        </header>

        <div className={styles.photoFrame}>
          <div className={styles.photoInner}>
            <img src={fotoPropuesta} alt="" />
          </div>
          <p className={styles.photoCaption}>nosotros dos, para siempre ✨</p>
        </div>

        <div className={styles.messageCard}>
          <p className={styles.message}>
            Desde el primer dia que te vi en la clase de ingles supe que ibas a ser mi esposa ,
            no tengo ninguna duda de que eres la mujer de mis sueños , con la que quiero pasar cada segundo de mi vida ,
            la mujer con la que quiero vivir cada aventura , cada viaje , cada experiencias buena o mala. 
            Te felicito por ser una mujer tan increible y maravillosa , espero ser parte de ti vida por muchisimo tiempo 
            y que podamos formar una familia hermosa como Dios manda , te amo mas que a nada en este mundo y 
            quiero volver a ser tu novio por siempre , en la tierra , en el cielo y si hay mas vidas en todas y cada una de ellas.
            Te amo más de lo que cualquier página web podría explicar.
          </p>
          <p className={styles.firma}>— teban 🌸</p>
        </div>

        <button type="button" className={styles.backBtn} onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </main>
    </div>
  )
}