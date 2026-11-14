import type { Education, Experience, Profile, Project, SkillGroup } from '#shared/types'

/**
 * The single contract between the UI and wherever content lives.
 * Today: static files in /data (local.ts). Later: Supabase (supabase.ts),
 * implementing this same interface. Everything is async so pages never change.
 */
export interface PortfolioRepository {
  getProfile(): Promise<Profile>
  getProjects(): Promise<Project[]>
  getProjectBySlug(slug: string): Promise<Project | null>
  getExperience(): Promise<Experience[]>
  getEducation(): Promise<Education[]>
  getSkillGroups(): Promise<SkillGroup[]>
}
