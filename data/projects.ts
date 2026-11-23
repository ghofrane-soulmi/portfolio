import type { Period, Project } from '../shared/types'
import { placeholder } from '../shared/utils/placeholder'

/*
 * Bookly (first two entries) is a personal project: real screenshots, live
 * demos and public code. Everything after it is client work, written as case
 * studies:
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

const BOOKLY = 'Personal project'
const BOOKLY_PERIOD: Period = { start: '2026-08', end: null }
const BOOKLY_API_REPO = {
  label: 'GitHub: API (Laravel)',
  href: 'https://github.com/ghofrane-soulmi/Bookly_backend',
}

export const projects: Project[] = [
  {
    id: 'bookly-booking-website',
    slug: 'bookly-booking-website',
    title: 'Bookly: Online Booking Website',
    summary:
      'Public site of a multi-tenant booking SaaS: a landing page, one booking page per business with live availability, and customer accounts to manage bookings.',
    problem:
      'Small salons, studios and clinics still take bookings by phone and DM. Clients cannot see free times, and businesses lose hours to back-and-forth and double bookings.',
    solution:
      'Built the customer side of Bookly: a marketing landing page and a public page per business at /b/{slug} with services, prices and opening hours. Free slots are computed server-side from opening hours and each staff member’s bookings, shown in the business’s timezone. Customers sign up once, book with any business and can cancel online up to a cut-off.',
    impact: [
      'Double bookings blocked server-side (row locks + HTTP 409)',
      'Live demo that rebuilds itself every night with fresh data',
      'Responsive, light and dark theme, tested end to end in a real browser',
    ],
    role: 'Solo: design, front end, API and deployment',
    stack: ['Vue.js 3', 'TypeScript', 'Vuetify 3', 'Pinia', 'Laravel 13', 'JWT', 'Vercel'],
    category: 'web-application',
    company: BOOKLY,
    period: BOOKLY_PERIOD,
    // The first image is the cover on cards and the case study: the live home page.
    images: [
      {
        src: '/projects/bookly/website-home.png',
        alt: 'Bookly home page: hero, call to action and product preview',
      },
      {
        src: '/projects/bookly/website-business-page.png',
        alt: 'Public booking page of the demo salon with services and opening hours',
      },
      {
        src: '/projects/bookly/website-booking.png',
        alt: 'Booking dialog with a day picker and free time slots',
      },
      { src: '/projects/bookly/website-mobile.png', alt: 'Booking page on a phone' },
    ],
    liveUrl: 'https://bookly-tn.vercel.app',
    repoUrl: 'https://github.com/ghofrane-soulmi/Bookly_frontoffice',
    extraLinks: [BOOKLY_API_REPO],
    featured: true,
  },
  {
    id: 'bookly-back-office',
    slug: 'bookly-back-office',
    title: 'Bookly: Business Back Office (SaaS)',
    summary:
      'Dashboard where each business runs its day: calendar, appointments, clients, services, invoices, staff and custom roles, on a multi-tenant Laravel API.',
    problem:
      'A booking page is only half the job: the business also needs one place for its team calendar, client history, invoicing and who is allowed to do what.',
    solution:
      'Built the staff app and the Laravel 13 API behind both apps. Every business is isolated by a tenant scope that fails closed, with per-business roles and permissions (owner, admin, staff, custom) that the menu and the API both enforce. Invoices use exact money in minor units with tax, discounts and partial payments. Deployed on Vercel with a TiDB (MySQL) database.',
    impact: [
      '138 automated backend tests, including tenant isolation',
      'Per-business roles and permissions enforced by API and UI',
      'Invoices from completed appointments in one click',
    ],
    role: 'Solo: architecture, API, back office and deployment',
    stack: [
      'Laravel 13',
      'PHP 8.4',
      'Vue.js 3',
      'TypeScript',
      'Vuetify 3',
      'MySQL / TiDB',
      'JWT',
      'Vercel',
    ],
    category: 'web-application',
    company: BOOKLY,
    period: BOOKLY_PERIOD,
    images: [
      {
        src: '/projects/bookly/backoffice-dashboard.png',
        alt: 'Back office dashboard with revenue, appointments and top services',
      },
      { src: '/projects/bookly/backoffice-calendar.png', alt: 'Team calendar in week view' },
      {
        src: '/projects/bookly/backoffice-invoice.png',
        alt: 'Invoice with tax, totals and payment actions',
      },
    ],
    liveUrl: 'https://bookly-admin-tn.vercel.app/login?demo=1',
    repoUrl: 'https://github.com/ghofrane-soulmi/Bookly_frontend',
    extraLinks: [BOOKLY_API_REPO],
    featured: true,
  },
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
    featured: false,
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
