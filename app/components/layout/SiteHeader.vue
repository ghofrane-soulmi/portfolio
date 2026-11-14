<script setup lang="ts">
const { data: profile } = await useProfile()
const route = useRoute()

const menuOpen = ref(false)
const scrolled = ref(false)

const links = computed(() => SECTIONS.map((id) => ({ id, to: `/#${id}` })))

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
        class="font-mono text-sm font-semibold tracking-tight hover:text-accent"
        :aria-label="`${profile?.name}, ${$t('nav.home')}`"
      >
        <span class="text-accent">&lt;</span>{{ profile?.name
        }}<span class="text-accent"> /&gt;</span>
      </NuxtLink>

      <nav :aria-label="$t('nav.label')" class="hidden md:block">
        <ul class="flex items-center gap-1">
          <li v-for="link in links" :key="link.id">
            <NuxtLink
              :to="link.to"
              class="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-text"
            >
              {{ $t(`nav.${link.id}`) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted hover:text-text md:hidden"
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
      class="border-t border-border md:hidden"
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
