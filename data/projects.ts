import type { Period, Project } from '../shared/types'
import { placeholder } from '../shared/utils/placeholder'

/*
 * All projects are client work, written as case studies.
 * - No client names in titles.
 * - No real screenshots: `images` stays empty and an abstract cover is generated.
 * - "estimated" is kept wherever it appears in the source material.
 */

const ROLE = 'Full Stack Developer'
const IBERIS = 'Iberis → Travel To Do'
const NEXT_CONSULT = 'Next Consult'

const periodTbd = (project: string): Period => ({
  start: placeholder(`start date for ${project}`),
  end: placeholder(`end date for ${project}`),
})

const problemTbd = (project: string): string =>
  placeholder(`problem statement for ${project} (what was broken or missing before)`)

export const projects: Project[] = [
  {
    id: 'hr-management-platform',
    slug: 'hr-management-platform',
    title: 'HR Management Platform',
    summary:
      'REST API built from scratch with JWT, CSRF hardening and role-based access for 50+ employees across 6 departments, with real-time WebSocket notifications.',
    problem: problemTbd('HR Management Platform'),
    solution:
      'Built a REST API from scratch with JWT authentication, CSRF hardening and role-based access control. Added real-time WebSocket notifications with Laravel Reverb, triggered on employee response thresholds in the evaluation workflow.',
    impact: [
      'Role-based access for 50+ employees across 6 departments',
      'Estimated 30% fewer response-tracking delays',
    ],
    role: ROLE,
    stack: ['Laravel', 'Vue.js 3', 'TypeScript', 'JWT', 'Laravel Reverb', 'MySQL'],
    category: 'web-application',
    company: IBERIS,
    period: periodTbd('HR Management Platform'),
    images: [],
    featured: true,
  },
  {
    id: 'maintenance-helpdesk',
    slug: 'maintenance-helpdesk',
    title: 'Maintenance Helpdesk',
    summary:
      '8-stage ticket state machine taking each request from validation to resolution, on a co-designed database schema.',
    problem: problemTbd('Maintenance Helpdesk'),
    solution:
      'Built an 8-stage ticket state machine: request, validation, quote, purchase order, planning, intervention, resolution. Co-designed the database schema.',
    impact: ['Estimated 25% faster ticket resolution'],
    role: `${ROLE}, co-designed the database schema`,
    stack: ['Laravel', 'Vue.js 3', 'MySQL'],
    category: 'web-application',
    company: placeholder('company for Maintenance Helpdesk'),
    period: periodTbd('Maintenance Helpdesk'),
    images: [],
    featured: true,
  },
  {
    id: 'hotel-voucher-scanning-app',
    slug: 'hotel-voucher-scanning-app',
    title: 'Hotel Voucher Scanning App',
    summary:
      'Cross-platform mobile app for hotel staff with real-time Firebase push notifications.',
    problem: problemTbd('Hotel Voucher Scanning App'),
    solution:
      'Built a cross-platform mobile app for hotel staff with Ionic Vue, connected to a REST API, with real-time Firebase push notifications.',
    impact: ['Estimated 20% fewer manual reservation errors'],
    role: ROLE,
    stack: ['Ionic Vue', 'Firebase', 'REST API'],
    category: 'mobile-app',
    company: placeholder('company for Hotel Voucher Scanning App'),
    period: periodTbd('Hotel Voucher Scanning App'),
    images: [],
    featured: true,
  },
  {
    id: 'invoicing-payment-reconciliation',
    slug: 'invoicing-payment-reconciliation',
    title: 'Invoicing and Payment Reconciliation Modules',
    summary:
      'Backend validation across invoicing, banking and payment reconciliation, handling 500+ transactions per month.',
    problem: problemTbd('Invoicing and Payment Reconciliation Modules'),
    solution:
      'Built backend validation across invoicing, banking and payment reconciliation, integrated with the Slack API, Dropbox and the Flouci API.',
    impact: ['500+ transactions per month'],
    role: ROLE,
    stack: ['Laravel', 'Vue.js', 'Slack API', 'Dropbox', 'Flouci API'],
    category: 'web-application',
    company: placeholder('company for Invoicing and Payment Reconciliation Modules'),
    period: periodTbd('Invoicing and Payment Reconciliation Modules'),
    images: [],
    featured: false,
  },
  {
    id: 'event-forum-live-platform',
    slug: 'event-forum-live-platform',
    title: 'Event and Forum Live Platform',
    summary: 'Real-time chat and live streaming for 200+ concurrent attendees.',
    problem: problemTbd('Event and Forum Live Platform'),
    solution: 'Built real-time chat over WebSockets and live streaming through the YouTube API.',
    impact: ['200+ concurrent attendees'],
    role: ROLE,
    stack: ['Laravel', 'WebSockets', 'YouTube API'],
    category: 'web-application',
    company: placeholder('company for Event and Forum Live Platform'),
    period: periodTbd('Event and Forum Live Platform'),
    images: [],
    featured: false,
  },
  {
    id: 'push-to-deploy-pipeline',
    slug: 'push-to-deploy-pipeline',
    title: 'Push-to-Deploy Pipeline and Monitoring',
    summary:
      'Git push-to-deploy on a Linux VPS with cron jobs, Discord release alerts and Sentry + Slack error alerting.',
    problem: problemTbd('Push-to-Deploy Pipeline and Monitoring'),
    solution:
      'Built a Git push-to-deploy pipeline on a Linux VPS with cron jobs and Discord webhook release alerts. Integrated Sentry with Slack alerting for production error tracing, and wrote Python scripts covering regression workflows.',
    impact: [
      'Releases in under 10 minutes',
      'Estimated 40% faster bug triage with Sentry + Slack alerting',
      'Python scripts covering 15+ regression workflows',
    ],
    role: ROLE,
    stack: ['Git', 'Linux VPS', 'cron', 'Discord webhooks', 'Sentry', 'Slack'],
    category: 'devops-tooling',
    company: IBERIS,
    period: periodTbd('Push-to-Deploy Pipeline and Monitoring'),
    images: [],
    featured: false,
  },
  {
    id: 'bank-checkbook-workflow',
    slug: 'bank-checkbook-workflow',
    title: 'Bank Checkbook Workflow',
    summary: 'Secure request-to-print interface for bank staff.',
    problem: problemTbd('Bank Checkbook Workflow'),
    solution:
      "Redesigned the bank's checkbook request-to-print workflow as a secure interface for bank staff.",
    impact: ['Estimated 35% fewer manual steps'],
    role: ROLE,
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    category: 'web-application',
    company: NEXT_CONSULT,
    period: periodTbd('Bank Checkbook Workflow'),
    images: [],
    featured: false,
  },
  {
    id: 'e-commerce-platform',
    slug: 'e-commerce-platform',
    title: 'E-commerce Platform',
    summary: '200+ products, order tracking and secure customer authentication.',
    problem: problemTbd('E-commerce Platform'),
    solution:
      'Built an e-commerce platform with a product catalog, order tracking and secure customer authentication.',
    impact: ['200+ catalog items', 'Order tracking and secure customer authentication'],
    role: ROLE,
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    category: 'web-application',
    company: NEXT_CONSULT,
    period: periodTbd('E-commerce Platform'),
    images: [],
    featured: false,
  },
]
