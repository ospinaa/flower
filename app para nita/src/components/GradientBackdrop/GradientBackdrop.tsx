import styles from './GradientBackdrop.module.css'

interface GradientBackdropProps {
  progress: number
}

// Top of the page: vivid romantic red. Bottom of the page: deep wine red.
const TOP_COLOR = { r: 214, g: 41, b: 63 }
const BOTTOM_COLOR = { r: 58, g: 12, b: 26 }

function mixChannel(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t)
}

export function GradientBackdrop({ progress }: GradientBackdropProps) {
  const r = mixChannel(TOP_COLOR.r, BOTTOM_COLOR.r, progress)
  const g = mixChannel(TOP_COLOR.g, BOTTOM_COLOR.g, progress)
  const b = mixChannel(TOP_COLOR.b, BOTTOM_COLOR.b, progress)

  return (
    <div className={styles.layer} style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}>
      <div className={styles.glow} />
      <div className={styles.grain} />
    </div>
  )
}