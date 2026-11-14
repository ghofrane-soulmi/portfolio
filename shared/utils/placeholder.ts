/**
 * Content that is still missing is written as `placeholder('what is missing')`.
 * In development it is shown with a visible marker; in production it is hidden.
 * Search the codebase for "PLACEHOLDER:" to list everything left to fill in.
 */
export const PLACEHOLDER_PREFIX = 'PLACEHOLDER:'

export function placeholder(description: string): string {
  return `${PLACEHOLDER_PREFIX} ${description}`
}

export function isPlaceholder(value: unknown): boolean {
  return typeof value === 'string' && value.startsWith(PLACEHOLDER_PREFIX)
}

/** Returns the value, or undefined when it is a placeholder. */
export function filled<T>(value: T): T | undefined {
  return isPlaceholder(value) ? undefined : value
}
