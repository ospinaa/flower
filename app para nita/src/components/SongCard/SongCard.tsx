import { useEffect, useRef, useState } from 'react'
import styles from './SongCard.module.css'

interface SongCardProps {
  title: string
  artist: string
  cover: string
  src: string
}

export function SongCard({ title, artist, cover, src }: SongCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      if (audio.duration > 0) setProgress(audio.currentTime / audio.duration)
    }
    const onEnded = () => {
      setPlaying(false)
      setProgress(0)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    try {
      await audio.play()
      setPlaying(true)
    } catch (error) {
      console.error('No se pudo iniciar la reproducción', error)
      setPlaying(false)
    }
  }

  const seek = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds))
  }

  const seekToRatio = (ratio: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = ratio * audio.duration
  }

  return (
    <div className={styles.card}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className={styles.header}>
        <span>Nuestra</span>
        <span className={styles.hearts}>♥ ♥</span>
        <span>canción</span>
      </div>

      <div className={styles.cover}>
        <img src={cover} alt="" />
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={() => seek(-10)}
          aria-label="Retroceder 10 segundos"
        >
          <SkipBackIcon />
        </button>
        <button
          type="button"
          className={styles.play}
          onClick={togglePlay}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => seek(10)}
          aria-label="Avanzar 10 segundos"
        >
          <SkipForwardIcon />
        </button>
      </div>

      <div
        className={styles.track}
        role="slider"
        aria-label="Progreso de la canción"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          seekToRatio((event.clientX - rect.left) / rect.width)
        }}
      >
        <div className={styles.trackFill} style={{ width: `${progress * 100}%` }} />
      </div>

      <p className={styles.caption}>
        {title} — {artist}
      </p>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M6 4l14 8-14 8V4z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="5" height="16" />
      <rect x="14" y="4" width="5" height="16" />
    </svg>
  )
}

function SkipBackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M6 5h2v14H6zM20 5v14l-11-7 11-7z" />
    </svg>
  )
}

function SkipForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M16 5h2v14h-2zM4 5v14l11-7-11-7z" />
    </svg>
  )
}
