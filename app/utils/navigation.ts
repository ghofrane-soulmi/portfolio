/** Home page sections, in order. `key` maps to `nav.<key>` in the locale files. */
export const SECTIONS = [
  'about',
  'skills',
  'experience',
  'projects',
  'education',
  'contact',
] as const

export type SectionId = (typeof SECTIONS)[number]
