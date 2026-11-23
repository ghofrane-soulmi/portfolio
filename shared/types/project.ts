import type { ImageAsset, Period } from './common'

export const PROJECT_CATEGORIES = ['web-application', 'mobile-app', 'devops-tooling'] as const
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export interface Project {
  id: string
  slug: string
  title: string
  /** One or two sentences shown on cards. */
  summary: string
  problem: string
  solution: string
  impact: string[]
  role: string
  stack: string[]
  category: ProjectCategory
  company: string
  period: Period
  /** Optional real visuals. When empty, an abstract cover is generated. */
  images: ImageAsset[]
  liveUrl?: string
  repoUrl?: string
  /** More links shown on the case study page (e.g. a related repository). */
  extraLinks?: ProjectLink[]
  featured: boolean
}

export interface ProjectLink {
  label: string
  href: string
}
