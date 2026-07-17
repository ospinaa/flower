export interface Reto {
    id: string
    texto: string
  }
  
  export interface Dia {
    id: string
    label: string
    dia: number
    mes: number
    año: number
    retos: Reto[]
    recompensa: {
      titulo: string
      descripcion: string
      emoji: string
    }
  }
  
  export const DIAS: Dia[] = [
    {
      id: 'dia1',
      label: '10 de agosto',
      dia: 10, mes: 7, año: 2026,
      retos: [
        { id: 'd1r1', texto: 'Mándale un mensaje diciéndole lo que más te gusta de él' },
        { id: 'd1r2', texto: 'Tómense una foto juntos hoy' },
        { id: 'd1r3', texto: 'Cuéntenle a alguien especial que hoy es su fecha oficial' },
      ],
      recompensa: {
        titulo: '¡Primer día completado!',
        descripcion: 'Mereces un abrazo que dure exactamente el tiempo que tú quieras. Reclámaselo cuando quieras.',
        emoji: '🤍',
      },
    },
    {
      id: 'dia2',
      label: '11 de agosto',
      dia: 11, mes: 7, año: 2026,
      retos: [
        { id: 'd2r1', texto: 'Prepárale o cómprale su comida favorita' },
        { id: 'd2r2', texto: 'Escríbele una nota física a mano, puede ser pequeña' },
        { id: 'd2r3', texto: 'Un beso donde el otro elija.' },
      ],
      recompensa: {
        titulo: '¡Día 2 sellado!',
        descripcion: 'Tienes derecho a escoger la película, el plan y el restaurante por un día completo. Sin negociación.',
        emoji: '🎬',
      },
    },
    {
      id: 'dia3',
      label: '12 de agosto',
      dia: 12, mes: 7, año: 2026,
      retos: [
        { id: 'd3r1', texto: 'Salgan a un lugar nuevo que ninguno de los dos conozca' },
        { id: 'd3r2', texto: 'Cuéntense un recuerdo favorito que tengan juntos' },
        { id: 'd3r3', texto: 'Tomarse una foto besándose jijijjiji' },
      ],
      recompensa: {
        titulo: '¡Mitad del camino!',
        descripcion: 'Un plan sorpresa a escoger: tú decides, él ejecuta. Puede ser cuando quieras.',
        emoji: '✨',
      },
    },
    {
      id: 'dia4',
      label: '13 de agosto',
      dia: 13, mes: 7, año: 2026,
      retos: [
        { id: 'd4r1', texto: 'Hacer un dibujo de él otro' },
        { id: 'd4r2', texto: 'Cocinen algo juntos, lo que sea' },
        { id: 'd4r3', texto: 'Compartan un momento sin teléfono por mínimo 30 minutos' },
      ],
      recompensa: {
        titulo: '¡Casi en la meta!',
        descripcion: 'Una noche de películas con todo incluido: merienda, cobija y la playlist que tú armes.',
        emoji: '🍿',
      },
    },
    {
      id: 'dia5',
      label: '14 de agosto',
      dia: 14, mes: 7, año: 2026,
      retos: [
        { id: 'd5r1', texto: 'Escríbele la razón número uno por la que quieres que sea tu novia' },
        { id: 'd5r2', texto: 'Regálale algo pequeño y significativo, no tiene que costar nada' },
        { id: 'd5r3', texto: 'Hagan algo coshino juaz juaz' },
      ],
      recompensa: {
        titulo: '¡Lo lograron!',
        descripcion: 'El premio mayor se desbloquea en la página principal. Búscalo.',
        emoji: '💍',
      },
    },
  ]
  
  export function isDiaUnlocked(dia: Dia): boolean {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const unlock = new Date(dia.año, dia.mes, dia.dia)
    return today >= unlock
  }