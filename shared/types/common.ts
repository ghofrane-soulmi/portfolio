/**
 * A date range. `start` / `end` use ISO partial dates: "YYYY" or "YYYY-MM".
 * `end: null` means "Present".
 */
export interface Period {
  start: string
  end: string | null
}

export interface ImageAsset {
  src: string
  alt: string
}
