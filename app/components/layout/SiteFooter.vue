<script setup lang="ts">
const { data: profile } = await useProfile()
const year = new Date().getFullYear()

const socials = computed(() => {
  const links = profile.value?.links
  if (!links) return []
  return [
    { key: 'email', icon: 'mail', href: `mailto:${links.email}` },
    { key: 'linkedin', icon: 'linkedin', href: filled(links.linkedin) },
    { key: 'github', icon: 'github', href: filled(links.github) },
  ].filter((s): s is { key: string; icon: IconName; href: string } => Boolean(s.href))
})
</script>

<template>
  <footer class="border-t border-border">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6 lg:px-8"
    >
      <p>
        {{ $t('footer.rights', { year, name: profile?.name }) }}
        {{ $t('footer.builtWith') }}
      </p>
      <ul class="flex items-center gap-2">
        <li v-for="s in socials" :key="s.key">
          <a
            :href="s.href"
            class="inline-flex size-10 items-center justify-center rounded-full hover:text-accent"
            :aria-label="$t(`contact.${s.key}`)"
            :target="s.key === 'email' ? undefined : '_blank'"
            :rel="s.key === 'email' ? undefined : 'noopener noreferrer'"
          >
            <AppIcon :name="s.icon" />
          </a>
        </li>
        <li>
          <a
            href="#top"
            class="inline-flex size-10 items-center justify-center rounded-full hover:text-accent"
            :aria-label="$t('common.backToTop')"
          >
            <AppIcon name="arrow-up" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
