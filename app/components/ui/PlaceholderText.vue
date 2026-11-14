<script setup lang="ts">
/**
 * Renders a content value. If it is still a placeholder:
 * - in development, shows a dashed amber marker so it is easy to spot;
 * - in production, renders nothing.
 */
defineProps<{ value: string | undefined | null }>()
const isDev = import.meta.dev
</script>

<template>
  <template v-if="value && !isPlaceholder(value)">{{ value }}</template>
  <span
    v-else-if="value && isDev"
    class="rounded border border-dashed border-amber-500 px-1.5 py-0.5 font-mono text-xs text-amber-600 dark:text-amber-400"
    :title="value"
  >
    {{ value }}
  </span>
</template>
