<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'neutral' | 'accent' }>(), { tone: 'neutral' })
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 font-mono text-xs leading-5"
    :class="
      tone === 'accent'
        ? 'bg-accent-soft text-accent'
        : 'border border-border bg-surface-2 text-muted'
    "
  >
    <slot />
  </span>
</template>
