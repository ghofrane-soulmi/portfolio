import type { Period } from './common'

export interface Experience {
  id: string
  role: string
  /** Companies in chronological order (more than one when the team changed company). */
  companies: string[]
  /** Optional context line, e.g. a company transition. */
  note?: string
  location: string
  period: Period
  highlights: string[]
}
