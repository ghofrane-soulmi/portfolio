import { usePortfolioRepository } from '~/repositories'

export function useProfile() {
  const repo = usePortfolioRepository()
  return useAsyncData('profile', () => repo.getProfile())
}
