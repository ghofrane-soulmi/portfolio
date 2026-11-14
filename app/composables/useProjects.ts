import type { ProjectCategory } from '#shared/types'
import { usePortfolioRepository } from '~/repositories'

/** All projects plus derived lists used by the home page and the /projects filters. */
export async function useProjects() {
  const repo = usePortfolioRepository()
  const result = await useAsyncData('projects', () => repo.getProjects(), { default: () => [] })

  const projects = result.data
  const featured = computed(() => projects.value.filter((p) => p.featured))

  const technologies = computed(() =>
    [...new Set(projects.value.flatMap((p) => p.stack))].sort((a, b) => a.localeCompare(b)),
  )

  const categories = computed<ProjectCategory[]>(() => [
    ...new Set(projects.value.map((p) => p.category)),
  ])

  return { ...result, projects, featured, technologies, categories }
}

/** A single project by slug, or null when it does not exist. */
export function useProject(slug: MaybeRefOrGetter<string>) {
  const repo = usePortfolioRepository()
  return useAsyncData(
    () => `project:${toValue(slug)}`,
    () => repo.getProjectBySlug(toValue(slug)),
  )
}
