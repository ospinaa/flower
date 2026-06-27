export interface PhotoSlot {
  id: string
  /** Index into the photo pool, wraps automatically (modulo pool length). */
  poolIndex: number
  top: string
  left: string
  width: string
  rotate: number
  zIndex?: number
  maxOpacity?: number
  tape?: boolean
  interactive?: boolean
  caption?: string
}

export interface SongData {
  title: string
  artist: string
  /** Index into the photo pool, reused as the cover art. */
  coverPoolIndex: number
  /** Path to the audio file, served from /public, e.g. "/audio/cancion.mp3". */
  src: string
}

export interface NarrativeSection {
  id: string
  kind: 'hero' | 'narrative' | 'song' | 'closing'
  eyebrow?: string
  phrase?: string
  heroTitle?: [string, string]
  photos: PhotoSlot[]
  song?: SongData
}

export const sections: NarrativeSection[] = [
  {
    id: 'inicio',
    kind: 'hero',
    heroTitle: ['PARA', 'TI'],
    phrase: 'Quiero decirte algo...',
    photos: [
      {
        id: 'a',
        poolIndex: 0,
        top: '4%',
        left: '2%',
        width: '46%',
        rotate: -7,
        zIndex: 1,
        maxOpacity: 0.95,
      },
      {
        id: 'b',
        poolIndex: 1,
        top: '38%',
        left: '44%',
        width: '52%',
        rotate: 5,
        zIndex: 3,
        maxOpacity: 1,
        tape: true,
        interactive: true,
        caption: 'Me alegra haberte vuelto a encontrar.',
      },
      {
        id: 'c',
        poolIndex: 2,
        top: '0%',
        left: '68%',
        width: '28%',
        rotate: 12,
        zIndex: 2,
        maxOpacity: 0.88,
      },
    ],
  },
  {
    id: 'comienzo',
    kind: 'narrative',
    eyebrow: 'Uno',
    phrase: 'Todo comenzó sin que nos diéramos cuenta , falto una sola mirada para saber que ibas a ser el amor de mi vida.',
    photos: [
      {
        id: 'a',
        poolIndex: 3,
        top: '6%',
        left: '6%',
        width: '50%',
        rotate: -4,
        zIndex: 2,
        maxOpacity: 1,
        tape: true,
        interactive: true,
        caption: 'Una tarde cualquiera que terminó no siendo cualquiera.',
      },
      {
        id: 'b',
        poolIndex: 4,
        top: '48%',
        left: '48%',
        width: '44%',
        rotate: 6,
        zIndex: 1,
        maxOpacity: 0.9,
      },
    ],
  },
  {
    id: 'recuerdos',
    kind: 'narrative',
    eyebrow: 'Dos',
    phrase: 'Los tiempos de Dios son perfectos y talvez antes no estabamos listos para darnos el amor que hoy en dia nos damos .',
    photos: [
      {
        id: 'a',
        poolIndex: 5,
        top: '8%',
        left: '46%',
        width: '48%',
        rotate: 7,
        zIndex: 2,
        maxOpacity: 0.95,
      },
      {
        id: 'b',
        poolIndex: 6,
        top: '42%',
        left: '4%',
        width: '46%',
        rotate: -5,
        zIndex: 3,
        maxOpacity: 1,
        interactive: true,
        caption: 'Quiero que viajemos juntos por todo el hp mundo.',
      },
    ],
  },
  {
    id: 'silencios',
    kind: 'narrative',
    eyebrow: 'Tres',
    phrase: 'Hoy me siento el hombre mas afortunado por que soy testigo de que el amor verdadero si existe y que el mio eres tu , mi media naranja , mi fiel acompañante , mi todo en este mundo.',
    photos: [
      {
        id: 'a',
        poolIndex: 7,
        top: '4%',
        left: '8%',
        width: '42%',
        rotate: -3,
        zIndex: 1,
        maxOpacity: 0.88,
      },
      {
        id: 'b',
        poolIndex: 0,
        top: '40%',
        left: '42%',
        width: '52%',
        rotate: 4,
        zIndex: 3,
        maxOpacity: 1,
        tape: true,
        interactive: true,
        caption: 'Enamorado de la mujer mas hermosa de la existencia humana.',
      },
    ],
  },
  {
    id: 'confesion',
    kind: 'narrative',
    eyebrow: 'Cuatro',
    phrase: 'Te amo mi mujer hermosa , eres la persona mas increible y maravillosa que Dios pudo haber creado , eres mi gran razon de ser y de esforzarme para ser un exelente espodo y papá en un futuro.',
    photos: [
      {
        id: 'a',
        poolIndex: 1,
        top: '6%',
        left: '50%',
        width: '44%',
        rotate: 5,
        zIndex: 2,
        maxOpacity: 0.92,
      },
      {
        id: 'b',
        poolIndex: 2,
        top: '44%',
        left: '6%',
        width: '48%',
        rotate: -4,
        zIndex: 3,
        maxOpacity: 1,
      },
    ],
  },
  {
    id: 'cancion',
    kind: 'song',
    eyebrow: 'Cinco',
    phrase: 'Te dedico esta canción , pero en un futuro se la pondré a cada rato a nuestra futura hija .',
    photos: [],
    song: {
      title: 'Aiunii',
      artist: 'jay wheeler',
      coverPoolIndex: 4,
      src: '/audio/cancion.wav',
    },
  },
  {
    id: 'cierre',
    kind: 'closing',
    eyebrow: 'Teaser',
    phrase: 'Esta página tendrá nuevas actualizaciones para ti en un futuro',
    photos: [
      {
        id: 'a',
        poolIndex: 3,
        top: '18%',
        left: '28%',
        width: '44%',
        rotate: -2,
        zIndex: 1,
        maxOpacity: 0.75,
      },
    ],
  },
]
