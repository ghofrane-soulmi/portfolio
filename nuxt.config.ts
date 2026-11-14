import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// PLACEHOLDER: replace with the production URL once the Vercel domain is known.
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://ghofrane-soulmi.vercel.app'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  css: ['~/assets/css/main.css'],

  // Folders under components/ are for organisation only: <ProjectCard>, not <ProjectProjectCard>.
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  // /data lives at the project root so it can later be swapped for a backend.
  alias: {
    '#data': fileURLToPath(new URL('./data', import.meta.url)),
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#0b0f14' }],
    },
  },

  site: {
    url: SITE_URL,
    name: 'Ghofrane Soulmi',
  },

  sitemap: {
    // Error pages are not content.
    exclude: ['/200', '/404'],
  },

  robots: {
    // Allow everything; the sitemap URL is added automatically.
    disallow: [],
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'portfolio-color-mode',
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [{ code: 'en', language: 'en-US', name: 'English', file: 'en.json' }],
    detectBrowserLanguage: false,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})
