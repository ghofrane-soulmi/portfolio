<script setup lang="ts">
const { t } = useI18n()
const { data: profile } = await useProfile()

const name = computed(() => profile.value?.name ?? '')

usePageSeo({
  title: () => t('seo.homeTitle', { name: name.value }),
  description: () => t('seo.homeDescription'),
  path: '/',
  type: 'profile',
})

// Structured data (schema.org Person) for search engines.
useHead(() => {
  const p = profile.value
  if (!p) return {}
  const sameAs = [p.links.linkedin, p.links.github].filter((l) => !isPlaceholder(l))
  return {
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: p.name,
          jobTitle: 'Full Stack Developer',
          email: `mailto:${p.links.email}`,
          address: { '@type': 'PostalAddress', addressLocality: 'Tunis', addressCountry: 'TN' },
          knowsLanguage: p.languages.map((l) => l.name),
          ...(sameAs.length ? { sameAs } : {}),
        }),
      },
    ],
  }
})
</script>

<template>
  <main id="main">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <FeaturedProjectsSection />
    <EducationSection />
    <ContactSection />
  </main>
</template>
