interface PageSeoInput {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Path of the page, e.g. "/projects". Defaults to the current route. */
  path?: MaybeRefOrGetter<string>
  type?: 'website' | 'article' | 'profile'
  /** Absolute or root-relative image. Defaults to /og-image.png. */
  image?: string
}

/** Title, description, canonical URL, Open Graph and Twitter tags for a page. */
export function usePageSeo(input: PageSeoInput) {
  const route = useRoute()
  const { public: config } = useRuntimeConfig()
  const siteUrl = String(config.siteUrl).replace(/\/$/, '')

  const absolute = (path: string) => (path.startsWith('http') ? path : `${siteUrl}${path}`)
  const url = computed(() => absolute(toValue(input.path) ?? route.path))
  const image = absolute(input.image ?? '/og-image.png')

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })

  useSeoMeta({
    title: () => toValue(input.title),
    description: () => toValue(input.description),
    ogTitle: () => toValue(input.title),
    ogDescription: () => toValue(input.description),
    ogType: input.type ?? 'website',
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: () => toValue(input.title),
    ogSiteName: 'Ghofrane Soulmi',
    twitterCard: 'summary_large_image',
    twitterTitle: () => toValue(input.title),
    twitterDescription: () => toValue(input.description),
    twitterImage: image,
  })
}
