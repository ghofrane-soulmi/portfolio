import type { Education } from '../shared/types'
import { placeholder } from '../shared/utils/placeholder'

/** Most recent first. */
export const education: Education[] = [
  {
    id: 'professional-master',
    degree: 'Professional Master',
    field: 'Information Systems & Knowledge Engineering',
    specialization: 'Business Intelligence',
    institution: placeholder('institution name for the Professional Master'),
    location: 'Nabeul, Tunisia',
    period: { start: '2021', end: '2023' },
  },
  {
    id: 'bachelor',
    degree: "Bachelor's Degree",
    field: 'IT Management',
    institution: placeholder("institution name for the Bachelor's Degree"),
    location: 'Nabeul, Tunisia',
    period: { start: '2018', end: '2021' },
  },
]
