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
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap',
        },
      ],
      meta: [{ name: 'theme-color', content: '#fff7fa' }],
      script: [
        {
          // Show the intro loader (components/layout/SiteLoader.vue) only when JS
          // runs. The 4 s timeout guarantees it can never get stuck.
          innerHTML:
            "document.documentElement.classList.add('is-loading');setTimeout(function(){document.documentElement.classList.remove('is-loading','is-loaded')},4000)",
          tagPosition: 'head',
        },
      ],
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
    preference: 'light',
    fallback: 'light',
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
