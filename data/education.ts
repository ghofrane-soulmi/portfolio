import type { Education } from '../shared/types'

const UNIVERSITY = 'University of Economics and Management of Nabeul'

/** Most recent first. */
export const education: Education[] = [
  {
    id: 'professional-master',
    degree: 'Professional Master',
    field: 'Information Systems & Knowledge Engineering',
    specialization: 'Business Intelligence',
    institution: UNIVERSITY,
    location: 'Nabeul, Tunisia',
    period: { start: '2021', end: '2023' },
  },
  {
    id: 'bachelor',
    degree: "Bachelor's Degree",
    field: 'IT Management',
    institution: UNIVERSITY,
    location: 'Nabeul, Tunisia',
    period: { start: '2018', end: '2021' },
  },
]
