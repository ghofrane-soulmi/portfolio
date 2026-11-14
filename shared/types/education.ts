import type { Period } from './common'

export interface Education {
  id: string
  degree: string
  field: string
  specialization?: string
  institution: string
  location: string
  period: Period
}
