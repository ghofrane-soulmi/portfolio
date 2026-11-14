<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')
const label = computed(() => (isDark.value ? t('theme.toLight') : t('theme.toDark')))

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
      :aria-label="label"
      :title="label"
      @click="toggle"
    >
      <AppIcon :name="isDark ? 'sun' : 'moon'" />
    </button>
    <template #fallback>
      <span class="inline-block size-10" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>
