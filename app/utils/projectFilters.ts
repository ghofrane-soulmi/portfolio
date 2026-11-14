import type { Project, ProjectCategory } from '#shared/types'

export interface ProjectFilters {
  category: ProjectCategory | null
  technology: string | null
}

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  return projects.filter(
    (p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.technology || p.stack.includes(filters.technology)),
  )
}
