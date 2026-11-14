import type { Period } from '#shared/types'

/** Formats a Period with the active locale, e.g. "Oct 2023 – Present". */
export function usePeriodFormat() {
  const { t, locale } = useI18n()

  function formatPoint(value: string): string {
    const [year, month] = value.split('-').map(Number)
    if (!year) return value
    if (!month) return String(year)
    return new Intl.DateTimeFormat(locale.value, {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(year, month - 1, 1)))
  }

  /** Returns undefined when the period is still a placeholder. */
  function formatPeriod(period: Period): string | undefined {
    if (isPlaceholder(period.start) || isPlaceholder(period.end)) return undefined
    const end = period.end === null ? t('common.present') : formatPoint(period.end)
    return `${formatPoint(period.start)} – ${end}`
  }

  return { formatPeriod }
}
