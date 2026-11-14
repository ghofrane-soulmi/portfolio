<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { IconName } from '~/utils/icons'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    icon?: IconName
    iconPosition?: 'left' | 'right'
    download?: boolean
    external?: boolean
  }>(),
  { variant: 'primary', iconPosition: 'right' },
)

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold',
  'transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    primary: 'bg-accent text-on-accent hover:bg-accent-strong',
    secondary: 'border border-border bg-surface text-text hover:border-accent hover:text-accent',
    ghost: 'text-text hover:text-accent',
  }[props.variant],
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <AppIcon v-if="icon && iconPosition === 'left'" :name="icon" :size="18" />
    <slot />
    <AppIcon v-if="icon && iconPosition === 'right'" :name="icon" :size="18" />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :download="download || undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <AppIcon v-if="icon && iconPosition === 'left'" :name="icon" :size="18" />
    <slot />
    <AppIcon v-if="icon && iconPosition === 'right'" :name="icon" :size="18" />
  </a>
  <button v-else type="button" :class="classes">
    <AppIcon v-if="icon && iconPosition === 'left'" :name="icon" :size="18" />
    <slot />
    <AppIcon v-if="icon && iconPosition === 'right'" :name="icon" :size="18" />
  </button>
</template>
