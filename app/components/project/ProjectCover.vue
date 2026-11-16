<script setup lang="ts">
import type { ProjectCategory } from '#shared/types'

const props = defineProps<{
  slug: string
  category: ProjectCategory
  stack: string[]
}>()

const cover = computed(() => buildCover(props.slug, props.category, props.stack))
const uid = useId()

const fillOf = (f: 'surface' | 'accent' | 'none') =>
  f === 'accent' ? 'var(--c-accent)' : f === 'surface' ? 'var(--c-surface)' : 'none'
</script>

<template>
  <svg
    :viewBox="`0 0 ${COVER_W} ${COVER_H}`"
    preserveAspectRatio="xMidYMid slice"
    class="block h-full w-full"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <pattern :id="`dots-${uid}`" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.2" fill="var(--c-border)" />
      </pattern>
      <radialGradient :id="`glow-${uid}`">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
      <radialGradient :id="`glow2-${uid}`">
        <stop offset="0%" stop-color="var(--c-accent-2)" stop-opacity="0.45" />
        <stop offset="100%" stop-color="var(--c-accent-2)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect :width="COVER_W" :height="COVER_H" fill="var(--c-surface-2)" />
    <rect :width="COVER_W" :height="COVER_H" :fill="`url(#dots-${uid})`" />
    <circle
      :cx="COVER_W - cover.glow.cx"
      :cy="COVER_H - cover.glow.cy"
      :r="cover.glow.r * 0.9"
      :fill="`url(#glow2-${uid})`"
    />
    <circle :cx="cover.glow.cx" :cy="cover.glow.cy" :r="cover.glow.r" :fill="`url(#glow-${uid})`" />

    <g stroke="var(--c-accent)" stroke-width="1.5">
      <template v-for="(s, i) in cover.shapes" :key="i">
        <rect
          v-if="s.kind === 'rect'"
          :x="s.x"
          :y="s.y"
          :width="s.w"
          :height="s.h"
          :rx="s.r"
          :fill="fillOf(s.fill)"
          :stroke-opacity="s.stroke ? s.opacity : 0"
          :fill-opacity="s.fill === 'none' ? 0 : s.opacity"
        />
        <circle
          v-else-if="s.kind === 'circle'"
          :cx="s.cx"
          :cy="s.cy"
          :r="s.r"
          :fill="fillOf(s.fill)"
          :stroke-opacity="s.stroke ? s.opacity : 0"
          :fill-opacity="s.fill === 'none' ? 0 : s.opacity"
        />
        <line
          v-else
          :x1="s.x1"
          :y1="s.y1"
          :x2="s.x2"
          :y2="s.y2"
          :stroke-opacity="s.opacity"
          :stroke-dasharray="s.dashed ? '6 6' : undefined"
        />
      </template>
    </g>

    <text
      :x="COVER_W - 20"
      :y="COVER_H - 18"
      text-anchor="end"
      font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
      font-size="13"
      fill="var(--c-muted)"
    >
      {{ cover.label }}
    </text>
  </svg>
</template>
