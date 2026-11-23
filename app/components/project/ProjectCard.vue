<script setup lang="ts">
import type { Project } from '#shared/types'

const props = withDefaults(defineProps<{ project: Project; headingLevel?: 'h2' | 'h3' }>(), {
  headingLevel: 'h3',
})

const MAX_TAGS = 4
const visibleStack = computed(() => props.project.stack.slice(0, MAX_TAGS))
const hiddenCount = computed(() => Math.max(0, props.project.stack.length - MAX_TAGS))
const firstImpact = computed(() => props.project.impact[0])
const cover = computed(() => props.project.images[0])
const hasLinks = computed(() => Boolean(props.project.liveUrl || props.project.repoUrl))
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_1px_2px_rgb(190_24_93/0.04)] transition-[border-color,transform,box-shadow] duration-300 focus-within:border-accent hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_48px_-24px_rgb(190_24_93/0.35)]"
  >
    <div class="relative aspect-[16/10] overflow-hidden border-b border-border">
      <div class="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
        <img
          v-if="cover"
          :src="cover.src"
          :alt="cover.alt"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover object-top"
        />
        <ProjectCover
          v-else
          :slug="project.slug"
          :category="project.category"
          :stack="project.stack"
        />
      </div>
      <span
        v-if="project.liveUrl"
        class="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-accent shadow-sm backdrop-blur"
      >
        <span class="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
        {{ $t('projects.liveDemo') }}
      </span>
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

      <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span
          aria-hidden="true"
          class="inline-flex items-center gap-1 text-sm font-semibold text-accent"
        >
          {{ $t('projects.readCaseStudy') }}
          <AppIcon
            name="arrow-right"
            :size="16"
            class="transition-transform group-hover:translate-x-1"
          />
        </span>
        <!-- Sit above the card-wide link so they stay clickable on their own. -->
        <template v-if="hasLinks">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener"
            class="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-on-accent transition-colors hover:bg-accent-strong"
          >
            <AppIcon name="external" :size="14" />
            {{ $t('projects.liveDemo') }}
          </a>
          <a
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener"
            class="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-text transition-colors hover:border-accent hover:text-accent"
          >
            <AppIcon name="github" :size="14" />
            {{ $t('projects.code') }}
          </a>
        </template>
      </div>
    </div>
  </article>
</template>
