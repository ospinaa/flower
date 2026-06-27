import { useMemo } from 'react'

const modules = import.meta.glob('../assets/photos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const PLACEHOLDER_COUNT = 8

function buildPlaceholder(index: number): string {
  const hues = [12, 350, 20, 340, 8, 355, 18, 345]
  const hue = hues[index % hues.length]
  const label = String(index + 1).padStart(2, '0')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'>
    <defs>
      <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='hsl(${hue}, 42%, 88%)'/>
        <stop offset='100%' stop-color='hsl(${hue}, 38%, 78%)'/>
      </linearGradient>
    </defs>
    <rect width='400' height='500' fill='url(#g)'/>
    <text x='200' y='255' text-anchor='middle' fill='hsl(${hue}, 30%, 55%)' font-family='Georgia,serif' font-size='28'>♥</text>
    <text x='200' y='290' text-anchor='middle' fill='hsl(${hue}, 20%, 50%)' font-family='sans-serif' font-size='14' opacity='0.6'>foto ${label}</text>
  </svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const placeholders = Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => buildPlaceholder(index))

export function usePhotoPool(): string[] {
  return useMemo(() => {
    const loaded = Object.keys(modules)
      .sort()
      .map((key) => modules[key])

    return loaded.length > 0 ? loaded : placeholders
  }, [])
}
