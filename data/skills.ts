import type { SkillGroup } from '../shared/types'

export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    title: 'Core',
    skills: [
      'Laravel',
      'Vue.js (2 & 3)',
      'TypeScript',
      'RESTful APIs',
      'JWT / CSRF auth',
      'MySQL',
      'PostgreSQL',
    ],
  },
  {
    id: 'front-end',
    title: 'Front-end',
    skills: [
      'Nuxt',
      'Tailwind CSS',
      'Ionic Vue',
      'Angular',
      'Laravel Livewire',
      'Bootstrap',
      'Chart.js',
      'HTML5',
      'CSS3',
    ],
  },
  {
    id: 'deployment-tools',
    title: 'Deployment & tools',
    skills: [
      'Git',
      'Linux (Ubuntu)',
      'VPS deployment (Git push-to-deploy)',
      'Cron jobs',
      'Docker (basic)',
      'Sentry',
      'Redis',
    ],
  },
  {
    id: 'methods',
    title: 'Methods',
    skills: ['SCRUM', 'UML', 'MVC architecture'],
  },
]
