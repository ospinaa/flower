import { useState, useCallback } from 'react'

const PROGRESS_KEY = 'nita_retos_v1'
const COMODIN_KEY  = 'nita_comodines_v1'
export const MAX_COMODINES = 3

type ProgressMap  = Record<string, boolean>
type ComodinState = { usados: number; activos: Record<string, true> }

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch { return {} }
}

function loadComodines(): ComodinState {
  try {
    const raw = localStorage.getItem(COMODIN_KEY)
    return raw ? (JSON.parse(raw) as ComodinState) : { usados: 0, activos: {} }
  } catch { return { usados: 0, activos: {} } }
}

function saveProgress(p: ProgressMap) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)) } catch { /* noop */ }
}

function saveComodines(c: ComodinState) {
  try { localStorage.setItem(COMODIN_KEY, JSON.stringify(c)) } catch { /* noop */ }
}

export function useRetosProgress() {
  const [progress,  setProgress]  = useState<ProgressMap>(loadProgress)
  const [comodines, setComodines] = useState<ComodinState>(loadComodines)

  const toggle = useCallback((retoId: string) => {
    setProgress((prev) => {
      const next = { ...prev, [retoId]: !prev[retoId] }
      saveProgress(next)
      return next
    })
  }, [])

  const isCompleted = useCallback(
    (retoId: string) => Boolean(progress[retoId]),
    [progress],
  )

  const countCompleted = useCallback(
    (retoIds: string[]) => retoIds.filter((id) => Boolean(progress[id])).length,
    [progress],
  )

  const comodinesRestantes = MAX_COMODINES - comodines.usados

  const isComodinActivo = useCallback(
    (retoId: string) => Boolean(comodines.activos[retoId]),
    [comodines],
  )

  const useComodin = useCallback((retoId: string) => {
    setComodines((prev) => {
      if (prev.usados >= MAX_COMODINES) return prev
      const next: ComodinState = {
        usados: prev.usados + 1,
        activos: { ...prev.activos, [retoId]: true },
      }
      saveComodines(next)
      return next
    })
  }, [])

  return {
    toggle,
    isCompleted,
    countCompleted,
    comodinesRestantes,
    isComodinActivo,
    useComodin,
  }
}