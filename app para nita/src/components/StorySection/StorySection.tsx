import { useNavigate } from 'react-router-dom'
import { RevealPhoto } from '../RevealPhoto/RevealPhoto'
import { SongCard } from '../SongCard/SongCard'
import type { NarrativeSection } from '../../data/sections'
import styles from './StorySection.module.css'

interface StorySectionProps {
  section: NarrativeSection
  photoFor: (poolIndex: number) => string
  onPhotoTap: (src: string, caption: string) => void
}

export function StorySection({ section, photoFor, onPhotoTap }: StorySectionProps) {
  const isHero = section.kind === 'hero'
  const isClosing = section.kind === 'closing'
  const hasCollage = section.photos.length > 0
  const navigate = useNavigate()

  return (
    <section
      className={`${styles.section} ${isHero ? styles.hero : ''} ${isClosing ? styles.closing : ''}`}
      aria-label={section.id}
    >
      {isHero && section.heroTitle && (
        <div className={styles.heroTitle} aria-hidden="true">
          <span>{section.heroTitle[0]}</span>
          <span>{section.heroTitle[1]}</span>
        </div>
      )}

      {hasCollage && (
        <div className={styles.collage}>
          <div className={styles.photoLayer}>
            {section.photos.map((slot) => (
              <RevealPhoto
                key={slot.id}
                src={photoFor(slot.poolIndex)}
                top={slot.top}
                left={slot.left}
                width={slot.width}
                rotate={slot.rotate}
                zIndex={slot.zIndex}
                maxOpacity={slot.maxOpacity}
                tape={slot.tape}
                interactive={slot.interactive}
                caption={slot.caption}
                onTap={onPhotoTap}
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.content}>
        {section.eyebrow && (
          <span className={styles.eyebrow}>
            {isHero ? 'hecho con amor' : section.eyebrow}
          </span>
        )}

        {section.phrase && (
          <div className={isHero ? styles.heroNote : styles.notePaper}>
            <p className={isHero ? styles.heroPhrase : styles.phrase}>{section.phrase}</p>
          </div>
        )}

        {section.kind === 'hero' && <span className={styles.scrollCue}>desliza ↓</span>}

        {section.kind === 'song' && section.song && (
          <div className={styles.songArea}>
            <SongCard
              title={section.song.title}
              artist={section.song.artist}
              cover={photoFor(section.song.coverPoolIndex)}
              src={section.song.src}
            />
          </div>
        )}

{}
      </div>
    </section>
  )
}