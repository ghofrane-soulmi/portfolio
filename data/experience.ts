import type { Experience } from '../shared/types'

/** Most recent first. */
export const experience: Experience[] = [
  {
    id: 'iberis-travel-to-do',
    role: 'Full Stack Developer',
    companies: ['Iberis', 'Travel To Do'],
    note: 'Same team and client across a company transition in Oct 2024.',
    location: 'Tunis',
    period: { start: '2023-10', end: null },
    highlights: [
      'Built a Git push-to-deploy VPS pipeline with cron jobs and Discord release alerts, cutting release turnaround to under 10 minutes',
      'Designed a REST API from scratch with JWT, CSRF hardening and role-based access control for 50+ employees across 6 departments',
      'Built real-time WebSocket notifications with Laravel Reverb for the HR evaluation workflow',
      'Integrated Sentry with Slack alerting for production error tracing',
    ],
  },
  {
    id: 'next-consult',
    role: 'Full Stack Developer',
    companies: ['Next Consult'],
    location: 'Tunis',
    period: { start: '2023-01', end: '2023-09' },
    highlights: [
      "Redesigned a bank's checkbook request-to-print workflow",
      'Built an SMTP-based import and notification system for 1,000+ coupons per campaign',
      'Built an e-commerce platform with 200+ catalog items, order tracking and customer authentication',
    ],
  },
]
