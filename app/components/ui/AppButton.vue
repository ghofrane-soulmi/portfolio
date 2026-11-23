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
  'transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    primary:
      'bg-accent text-on-accent shadow-[0_10px_24px_-10px_rgb(190_24_93/0.7)] hover:bg-accent-strong hover:shadow-[0_14px_30px_-10px_rgb(190_24_93/0.8)]',
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
