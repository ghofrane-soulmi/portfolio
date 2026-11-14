import type { Profile } from '../shared/types'
import { placeholder } from '../shared/utils/placeholder'

export const profile: Profile = {
  name: 'Ghofrane Soulmi',
  title: 'Full Stack Developer (Laravel, Vue.js 3, TypeScript)',
  location: 'Tunis, Tunisia',
  bio:
    'Full Stack Developer with 3+ years of experience building production web applications ' +
    'with Laravel and Vue.js 3, across HR technology, travel operations and financial services. ' +
    'I design REST APIs and authentication (JWT, CSRF hardening), real-time systems with ' +
    'WebSockets, VPS deployments, and cross-platform mobile apps with Ionic.',
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'B2 (IELTS)' },
    { name: 'French', level: 'B2' },
    { name: 'German', level: 'A2' },
  ],
  links: {
    email: 'ghofranesoulmi@gmail.com',
    linkedin: placeholder('LinkedIn profile URL'),
    github: placeholder('GitHub profile URL'),
  },
  // Add the file at /public/cv.pdf
  cvUrl: '/cv.pdf',
}
