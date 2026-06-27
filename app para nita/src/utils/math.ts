export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/**
 * Returns a 0..1 envelope: fades in between start and peakIn,
 * stays at 1 between peakIn and peakOut, fades out between peakOut and end.
 * Used to make photo compositions cross-fade smoothly between sections.
 */
export function triangleWave(
  progress: number,
  start: number,
  peakIn: number,
  peakOut: number,
  end: number,
): number {
  if (progress <= start || progress >= end) return 0
  if (progress < peakIn) return smoothstep(start, peakIn, progress)
  if (progress > peakOut) return 1 - smoothstep(peakOut, end, progress)
  return 1
}
