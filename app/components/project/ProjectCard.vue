<script setup lang="ts">
import type { Project } from '#shared/types'

const props = withDefaults(defineProps<{ project: Project; headingLevel?: 'h2' | 'h3' }>(), {
  headingLevel: 'h3',
})

const MAX_TAGS = 4
const visibleStack = computed(() => props.project.stack.slice(0, MAX_TAGS))
const hiddenCount = computed(() => Math.max(0, props.project.stack.length - MAX_TAGS))
const firstImpact = computed(() => props.project.impact[0])
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,transform] duration-300 focus-within:border-accent hover:-translate-y-1 hover:border-accent/60"
  >
    <div class="aspect-[16/10] overflow-hidden border-b border-border">
      <div class="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
        <ProjectCover :slug="project.slug" :category="project.category" :stack="project.stack" />
      </div>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <p class="font-mono text-xs tracking-widest text-accent uppercase">
        {{ $t(`categories.${project.category}`) }}
      </p>
      <component :is="headingLevel" class="mt-2 text-xl font-semibold tracking-tight">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {{ project.title }}
        </NuxtLink>
      </component>
      <p class="mt-3 leading-relaxed text-muted">{{ project.summary }}</p>

      <p v-if="firstImpact" class="mt-4 text-sm font-medium text-text">
        <span aria-hidden="true" class="text-accent">↗ </span>{{ firstImpact }}
      </p>

      <ul class="mt-auto flex flex-wrap gap-2 pt-6">
        <li v-for="tech in visibleStack" :key="tech">
          <TagPill>{{ tech }}</TagPill>
        </li>
        <li v-if="hiddenCount > 0">
          <TagPill>+{{ hiddenCount }}</TagPill>
        </li>
      </ul>

      <span
        aria-hidden="true"
        class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent"
      >
        {{ $t('projects.readCaseStudy') }}
        <AppIcon
          name="arrow-right"
          :size="16"
          class="transition-transform group-hover:translate-x-1"
        />
      </span>
    </div>
  </article>
</template>
