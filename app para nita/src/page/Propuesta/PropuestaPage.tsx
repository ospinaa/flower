import { useState } from 'react'
import styles from './PropuestaPage.module.css'
import fotoPropuesta from '../../assets/photos/09.jpeg'

const pasos = [
  {
    numero: '01',
    titulo: 'Fechas',
    texto: 'al igual que el año pasado el 10 de agosto sera un dia muy especial para los dos asi que preparate.',
    detalle: 'ese dia se desbloqueara la ultima actualizacion de esta pagina para que empezemos un jueguito re melo.',
    icono: '⏰',
  },
  {
    numero: '02',
    titulo: 'Reglas',
    texto: 'el 10 de agosto legalmente sera nuestra fecha esepcial donde seremos novios casi esposos , peroo... ',
    detalle: 'desde el 10 hasta el 14 de agoso tendremos que cumplir ciertos retos o actividades para sellar nuestra con broche de oro.',
    icono: '🎖️',
  },
  {
    numero: '03',
    titulo: 'Condiciones',
    texto: 'las actividades tendran que complirse el dia estipulado para que sean validadas en el juego.',
    detalle: 'cada reto o actividad tendran sus respectivas recompensas en la pagina , las cuales iran formando un premio al final.',
    icono: '📋',
  },
  {
    numero: '04',
    titulo: 'Bonus',
    texto: 'cada dia finalizado con su totalidad de actividades o retos sera premiado con un deseo que me podras pedir de lo que sea cuando sea.',
    detalle: 'tendras 3 comodines para usar en el proceso del juego los cuales te permitiran cambiar o agregar un reto.',
    icono: '🃏',
  },
]

interface FlipCardProps {
  paso: typeof pasos[number]
  index: number
}

function FlipCard({ paso, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={styles.cardScene}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={`${styles.card} ${flipped ? styles.cardFlipped : ''}`}>

        {/* Frente */}
        <div className={styles.cardFace}>
          <span className={styles.cardNumero}>{paso.numero}</span>
          <h3 className={styles.cardTitulo}>{paso.titulo}</h3>
          <p className={styles.cardTexto}>{paso.texto}</p>
          <span className={styles.cardHint}>toca para ver más</span>
        </div>

        {/* Reverso */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <span className={styles.cardIcono}>{paso.icono}</span>
          <p className={styles.cardDetalle}>{paso.detalle}</p>
          <span className={styles.cardHint}>toca para volver</span>
        </div>

      </div>
    </div>
  )
}

export function PropuestaPage() {
  return (
    <div className={styles.page}>
      <div className={styles.flowerLayer} aria-hidden="true" />

      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>algo especial para ti</span>
          <h1 className={styles.title}>
            Antes de&nbsp;preguntarte
            <br />
            algo...
          </h1>
          <p className={styles.subtitle}>
            Quiero explicarte el propósito de esta página. Principalmente está hecha
            para que nunca se te olvide lo mucho que te amo, especialmente en tus días
            más difíciles. Quiero que sea tan especial como tú lo eres para mí, pero
            va a ser muy difícil porque tú eres demasiado especial y yo soy muy malo
            programando. Intentaré hacerlo lo mejor posible, espero que te guste.
          </p>
        </header>

        <div className={styles.photoFrame}>
          <div className={styles.photoInner}>
            <img src={fotoPropuesta} alt="" />
          </div>
        </div>

        <section className={styles.comoFunciona}>
          <span className={styles.eyebrow}>Ahora</span>
          <h2 className={styles.sectionTitle}>¿Cómo funciona?</h2>

          <div className={styles.cards}>
            {pasos.map((paso, i) => (
              <FlipCard key={paso.numero} paso={paso} index={i} />
            ))}
          </div>

          <p className={styles.subtitle}>
           Preparate para lo que sea 
          </p>

        </section>
      </main>
    </div>
  )
}