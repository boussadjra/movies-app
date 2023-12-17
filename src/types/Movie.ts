export const roles = [
  'Background',
  'Cameo',
  'Recurring character',
  'Side character',
  'Series regular'
] as const

export type Role = (typeof roles)[number]

export type Actor = {
  name: string
  age: number
  joinDate: Date
  role: Role | null
}

export type Movie = {
  title: string
  year: number
  description: string
  actors: Actor[]
}
