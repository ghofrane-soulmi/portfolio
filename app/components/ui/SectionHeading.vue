<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    id?: string
    level?: 'h1' | 'h2'
  }>(),
  { level: 'h2' },
)
</script>

<template>
  <header v-reveal class="mb-10 max-w-3xl sm:mb-14">
    <p class="mb-3 font-mono text-sm tracking-widest text-accent uppercase">
      {{ eyebrow }}
    </p>
    <component
      :is="level"
      :id="id"
      class="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
    >
      {{ title }}
    </component>
    <slot />
  </header>
</template>
