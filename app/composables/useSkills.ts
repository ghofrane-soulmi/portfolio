import { usePortfolioRepository } from '~/repositories'

export function useSkills() {
  const repo = usePortfolioRepository()
  return useAsyncData('skills', () => repo.getSkillGroups(), { default: () => [] })
}
