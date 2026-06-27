import type { ReactNode } from 'react'
import type { NarrativeSection } from '../../data/sections'
import styles from './ScrapbookDecor.module.css'

interface ScrapbookDecorProps {
  sectionId: string
  kind: NarrativeSection['kind']
  className?: string
}

export function ScrapbookDecor({ sectionId, kind, className }: ScrapbookDecorProps) {
  return (
    <div className={`${styles.layer} ${className ?? ''}`} aria-hidden="true">
      {kind === 'hero' && (
        <>
          <HeartPatch className={`${styles.sticker} ${styles.heroHeartA}`} />
          <HeartPatch className={`${styles.sticker} ${styles.heroHeartB}`} small />
          <Rose className={`${styles.sticker} ${styles.heroRose}`} />
          <Sticker className={`${styles.sticker} ${styles.heroSticker}`}>in my era</Sticker>
        </>
      )}

      {sectionId === 'comienzo' && (
        <>
          <WashiTape className={`${styles.sticker} ${styles.tapeA}`} />
          <HeartFlat className={`${styles.sticker} ${styles.heartFlatA}`} />
        </>
      )}

      {sectionId === 'recuerdos' && (
        <>
          <HeartPatch className={`${styles.sticker} ${styles.recHeart}`} small />
          <Lollipop className={`${styles.sticker} ${styles.lollipopA}`} label="BE MINE" color="#c1121f" />
        </>
      )}

      {sectionId === 'silencios' && (
        <>
          <Envelope className={`${styles.sticker} ${styles.envelopeA}`} />
          <HeartFlat className={`${styles.sticker} ${styles.heartFlatB}`} />
        </>
      )}

      {sectionId === 'confesion' && (
        <>
          <Rose className={`${styles.sticker} ${styles.roseSmall}`} small />
          <HeartPatch className={`${styles.sticker} ${styles.confHeart}`} />
        </>
      )}

      {kind === 'song' && <HeartBrush className={`${styles.sticker} ${styles.songHeart}`} />}

      {kind === 'closing' && (
        <>
          <HeartBrush className={`${styles.sticker} ${styles.closingHeart}`} />
          <Lollipop className={`${styles.sticker} ${styles.lollipopB}`} label="LOVE YA" color="#e07a8a" />
        </>
      )}
    </div>
  )
}

function HeartPatch({ className, small }: { className?: string; small?: boolean }) {
  const size = small ? 44 : 62
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 54s-18-11-24-22C4 24 8 14 16 12c5-1 10 2 16 10 6-8 11-11 16-10 8 2 12 12 8 20-6 11-24 22-24 22z"
        fill="#c1121f"
      />
      <path
        d="M32 54s-18-11-24-22C4 24 8 14 16 12c5-1 10 2 16 10 6-8 11-11 16-10 8 2 12 12 8 20-6 11-24 22-24 22z"
        stroke="#9b0f1a"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        opacity="0.5"
      />
    </svg>
  )
}

function HeartFlat({ className }: { className?: string }) {
  return (
    <svg className={className} width="52" height="48" viewBox="0 0 52 48" fill="none">
      <path
        d="M26 42S6 28 4 18C2 10 8 4 14 4c4 0 8 3 12 9 4-6 8-9 12-9 6 0 12 6 10 14-2 10-22 24-22 24z"
        fill="#c1121f"
      />
      <rect x="8" y="16" width="36" height="10" rx="2" fill="#faf6ef" />
    </svg>
  )
}

function HeartBrush({ className }: { className?: string }) {
  return (
    <svg className={className} width="88" height="78" viewBox="0 0 88 78" fill="none">
      <path
        d="M44 68C44 68 8 48 6 28C4 12 18 4 30 8C36 10 40 16 44 24C48 16 52 10 58 8C70 4 84 12 82 28C80 48 44 68 44 68z"
        fill="#c1121f"
        opacity="0.92"
      />
      <path
        d="M12 30c8-6 18-4 24 4M76 30c-8-6-18-4-24 4"
        stroke="#faf6ef"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

function Rose({ className, small }: { className?: string; small?: boolean }) {
  const w = small ? 56 : 72
  return (
    <svg className={className} width={w} height={w * 1.2} viewBox="0 0 72 86" fill="none">
      <ellipse cx="36" cy="28" rx="14" ry="12" fill="#c1121f" />
      <ellipse cx="24" cy="34" rx="11" ry="10" fill="#d41828" />
      <ellipse cx="48" cy="34" rx="11" ry="10" fill="#a50f1c" />
      <ellipse cx="36" cy="40" rx="10" ry="9" fill="#c1121f" />
      <path d="M36 46v28" stroke="#3d6b3d" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 58c-8 4-12 10-14 16" stroke="#3d6b3d" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 62c6 2 10 6 12 12" stroke="#3d6b3d" strokeWidth="2" strokeLinecap="round" />
      <circle cx="52" cy="72" r="4" fill="#8b7ec8" opacity="0.7" />
    </svg>
  )
}

function Envelope({ className }: { className?: string }) {
  return (
    <svg className={className} width="64" height="52" viewBox="0 0 64 52" fill="none">
      <rect x="4" y="10" width="56" height="38" rx="3" fill="#c1121f" />
      <path d="M4 14l28 20 28-20" stroke="#faf6ef" strokeWidth="2" fill="none" />
      <circle cx="50" cy="14" r="6" fill="#faf6ef" />
      <path
        d="M47 14c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5c0 2.5-3 5.5-3 5.5s-3-3-3-5.5z"
        fill="#c1121f"
      />
    </svg>
  )
}

function Lollipop({
  className,
  label,
  color,
}: {
  className?: string
  label: string
  color: string
}) {
  return (
    <div className={className}>
      <svg width="54" height="72" viewBox="0 0 54 72" fill="none">
        <path d="M27 34v32" stroke="#d4b896" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M27 8c-10 0-16 6-16 14 0 10 16 18 16 18s16-8 16-18c0-8-6-14-16-14z"
          fill={color}
        />
        <path
          d="M27 8c-10 0-16 6-16 14 0 10 16 18 16 18s16-8 16-18c0-8-6-14-16-14z"
          stroke="#fff"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>
      <span className={styles.lollipopLabel}>{label}</span>
    </div>
  )
}

function WashiTape({ className }: { className?: string }) {
  return (
    <svg className={className} width="72" height="22" viewBox="0 0 72 22" fill="none">
      <rect x="0" y="0" width="72" height="22" rx="2" fill="#d4b896" opacity="0.85" />
      <line x1="8" y1="6" x2="64" y2="6" stroke="#c4a67a" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="16" x2="58" y2="16" stroke="#c4a67a" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

function Sticker({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={`${styles.textSticker} ${className ?? ''}`}>
      {children}
    </span>
  )
}
