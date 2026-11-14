import { usePortfolioRepository } from '~/repositories'

export function useExperience() {
  const repo = usePortfolioRepository()
  return useAsyncData('experience', () => repo.getExperience(), { default: () => [] })
}
