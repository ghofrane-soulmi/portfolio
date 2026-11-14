<script setup lang="ts">
const { data: profile } = await useProfile()

const isDev = import.meta.dev
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  if (!profile.value) return
  try {
    await navigator.clipboard.writeText(profile.value.links.email)
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Clipboard unavailable: the mailto link still works.
  }
}

onBeforeUnmount(() => clearTimeout(resetTimer))

const socials = computed(() => {
  const links = profile.value?.links
  if (!links) return []
  return [
    { key: 'linkedin' as const, icon: 'linkedin' as const, href: links.linkedin },
    { key: 'github' as const, icon: 'github' as const, href: links.github },
  ]
})
</script>

<template>
  <PageSection
    v-if="profile"
    id="contact"
    :eyebrow="$t('contact.eyebrow')"
    :title="$t('contact.title')"
  >
    <template #intro>
      <p class="mt-5 text-lg text-muted">{{ $t('contact.intro') }}</p>
    </template>

    <div
      v-reveal
      class="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:p-14"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-accent/10 blur-3xl"
      />

      <p class="font-mono text-xs tracking-widest text-muted uppercase">
        {{ $t('contact.email') }}
      </p>
      <div class="mt-3 flex flex-wrap items-center gap-3">
        <a
          :href="`mailto:${profile.links.email}`"
          class="text-2xl font-bold tracking-tight break-all underline decoration-accent/40 decoration-2 underline-offset-8 hover:text-accent hover:decoration-accent sm:text-4xl lg:text-5xl"
        >
          {{ profile.links.email }}
        </a>
        <button
          type="button"
          class="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
          :aria-label="$t('contact.copyEmail')"
          :title="$t('contact.copyEmail')"
          @click="copyEmail"
        >
          <AppIcon :name="copied ? 'check' : 'copy'" :size="18" />
        </button>
        <span role="status" aria-live="polite" class="text-sm text-accent">
          <template v-if="copied">{{ $t('contact.copied') }}</template>
        </span>
      </div>

      <div class="mt-10 flex flex-wrap items-center gap-3">
        <AppButton :href="`mailto:${profile.links.email}`" icon="mail" icon-position="left">
          {{ $t('hero.contactMe') }}
        </AppButton>
        <AppButton :href="profile.cvUrl" download variant="secondary" icon="download">
          {{ $t('hero.downloadCv') }}
        </AppButton>
        <template v-for="s in socials" :key="s.key">
          <AppButton
            v-if="!isPlaceholder(s.href)"
            :href="s.href"
            external
            variant="ghost"
            :icon="s.icon"
            icon-position="left"
          >
            {{ $t(`contact.${s.key}`) }}
          </AppButton>
          <PlaceholderText v-else-if="isDev" :value="s.href" />
        </template>
      </div>
    </div>
  </PageSection>
</template>
