import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './HamburgerMenu.module.css'

const ROUTES = [
  { path: '/',          label: 'Inicio',    emoji: '🌸' },
  { path: '/propuesta', label: 'Propuesta', emoji: '💌' },
  { path: '/retos',     label: 'Retos',     emoji: '🎯' },
  { path: '/final',     label: 'Final',     emoji: '✨' },
]

export function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Cierra el menú cuando cambia la ruta
  useEffect(() => { setOpen(false) }, [pathname])

  // Bloquea scroll cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function goTo(path: string) {
    navigate(path)
    setOpen(false)
  }

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* Overlay oscuro */}
      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel del menú */}
      <nav
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        aria-label="Navegación principal"
      >
        <p className={styles.menuEyebrow}>nuestro mundo</p>

        <ul className={styles.list}>
          {ROUTES.map((route, i) => {
            const active = pathname === route.path
            return (
              <li
                key={route.path}
                className={styles.item}
                style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
              >
                <button
                  type="button"
                  className={`${styles.link} ${active ? styles.linkActive : ''}`}
                  onClick={() => goTo(route.path)}
                >
                  <span className={styles.linkEmoji}>{route.emoji}</span>
                  <span className={styles.linkLabel}>{route.label}</span>
                  {active && <span className={styles.activeDot} aria-hidden="true" />}
                </button>
              </li>
            )
          })}
        </ul>

        <p className={styles.menuFooter}>hecho con ❤️ por teban</p>
      </nav>
    </>
  )
}