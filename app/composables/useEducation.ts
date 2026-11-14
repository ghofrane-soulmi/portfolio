import { usePortfolioRepository } from '~/repositories'

export function useEducation() {
  const repo = usePortfolioRepository()
  return useAsyncData('education', () => repo.getEducation(), { default: () => [] })
}
