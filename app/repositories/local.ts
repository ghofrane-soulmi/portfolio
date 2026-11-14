import { education } from '#data/education'
import { experience } from '#data/experience'
import { profile } from '#data/profile'
import { projects } from '#data/projects'
import { skillGroups } from '#data/skills'
import type { PortfolioRepository } from './types'

/** Reads the typed files in /data. Returns copies so callers cannot mutate the source. */
export const localRepository: PortfolioRepository = {
  async getProfile() {
    return structuredClone(profile)
  },
  async getProjects() {
    return structuredClone(projects)
  },
  async getProjectBySlug(slug) {
    const project = projects.find((p) => p.slug === slug)
    return project ? structuredClone(project) : null
  },
  async getExperience() {
    return structuredClone(experience)
  },
  async getEducation() {
    return structuredClone(education)
  },
  async getSkillGroups() {
    return structuredClone(skillGroups)
  },
}
