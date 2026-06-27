import { useState } from 'react'
import { PhotoModal } from './components/PhotoModal/PhotoModal'
import { StorySection } from './components/StorySection/StorySection'
import { sections } from './data/sections'
import { usePhotoPool } from './hooks/usePhotoPool'
import './App.css'

interface ActivePhoto {
  src: string
  caption: string
}

function App() {
  const photos = usePhotoPool()
  const [activePhoto, setActivePhoto] = useState<ActivePhoto | null>(null)

  const photoFor = (poolIndex: number) => (photos.length > 0 ? photos[poolIndex % photos.length] : '')

  return (
    <div className="experience">
      <main className="story">
        {sections.map((section) => (
          <StorySection
            key={section.id}
            section={section}
            photoFor={photoFor}
            onPhotoTap={(src, caption) => setActivePhoto({ src, caption })}
          />
        ))}
      </main>

      {activePhoto && (
        <PhotoModal
          src={activePhoto.src}
          caption={activePhoto.caption}
          onClose={() => setActivePhoto(null)}
        />
      )}

      <footer className="siteFooter">hecho con todo mi corazón</footer>
    </div>
  )
}

export default App