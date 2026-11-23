<script setup lang="ts">
const { data: profile } = await useProfile()
const route = useRoute()

const menuOpen = ref(false)
const scrolled = ref(false)

const links = computed(() => SECTIONS.map((id) => ({ id, to: `/#${id}` })))

const socials = computed(() => {
  const l = profile.value?.links
  if (!l) return []
  return [
    { key: 'github', icon: 'github' as IconName, href: filled(l.github) },
    { key: 'linkedin', icon: 'linkedin' as IconName, href: filled(l.linkedin) },
    { key: 'email', icon: 'mail' as IconName, href: `mailto:${l.email}` },
  ].filter((s): s is { key: string; icon: IconName; href: string } => Boolean(s.href))
})

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) menuOpen.value = false
}

watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-[background-color,border-color] duration-300"
    :class="
      scrolled || menuOpen
        ? 'border-b border-border bg-bg/85 backdrop-blur-md'
        : 'border-b border-transparent'
    "
  >
    <div
      class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="group inline-flex items-center gap-2.5"
        :aria-label="`${profile?.name}, ${$t('nav.home')}`"
      >
        <span
          aria-hidden="true"
          class="font-display inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-base font-bold text-white shadow-[0_8px_18px_-8px_rgb(190_24_93/0.7)] transition-transform group-hover:-rotate-6"
          >G</span
        >
        <span class="font-display text-lg font-bold tracking-tight group-hover:text-accent">
          ghofrane<span class="text-accent">.dev</span>
        </span>
      </NuxtLink>

      <nav :aria-label="$t('nav.label')" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="link in links" :key="link.id">
            <NuxtLink
              :to="link.to"
              class="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              {{ $t(`nav.${link.id}`) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-1.5">
        <a
          v-for="s in socials"
          :key="s.key"
          :href="s.href"
          :target="s.key === 'email' ? undefined : '_blank'"
          :rel="s.key === 'email' ? undefined : 'noopener noreferrer'"
          :aria-label="$t(`contact.${s.key}`)"
          :title="$t(`contact.${s.key}`)"
          class="hidden size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-accent sm:inline-flex"
        >
          <AppIcon :name="s.icon" :size="19" />
        </a>
        <span aria-hidden="true" class="mx-1 hidden h-5 w-px bg-border sm:block" />
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted hover:text-text lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <nav
      v-show="menuOpen"
      id="mobile-nav"
      :aria-label="$t('nav.label')"
      class="border-t border-border lg:hidden"
    >
      <ul class="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
        <li v-for="link in links" :key="link.id">
          <NuxtLink
            :to="link.to"
            class="block rounded-lg px-3 py-3 text-base text-muted hover:bg-surface-2 hover:text-text"
            @click="menuOpen = false"
          >
            {{ $t(`nav.${link.id}`) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
