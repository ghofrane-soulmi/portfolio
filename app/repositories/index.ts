import { localRepository } from './local'
import type { PortfolioRepository } from './types'

export type { PortfolioRepository } from './types'

/**
 * The one place that decides where content comes from.
 * To move to Supabase: add `supabase.ts` implementing PortfolioRepository
 * and return it here (e.g. based on runtime config).
 */
export function usePortfolioRepository(): PortfolioRepository {
  return localRepository
}
