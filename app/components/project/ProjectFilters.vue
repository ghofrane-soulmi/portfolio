<script setup lang="ts">
import type { ProjectCategory } from '#shared/types'

defineProps<{
  categories: ProjectCategory[]
  technologies: string[]
  resultCount: number
}>()

const category = defineModel<ProjectCategory | null>('category', { required: true })
const technology = defineModel<string | null>('technology', { required: true })

const hasFilters = computed(() => category.value !== null || technology.value !== null)

function reset() {
  category.value = null
  technology.value = null
}

const pillBase =
  'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'
const pillOn = 'border-accent bg-accent text-on-accent'
const pillOff = 'border-border bg-surface text-muted hover:border-accent hover:text-text'
</script>

<template>
  <section
    :aria-label="$t('projects.filters.label')"
    class="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between"
  >
    <div class="flex flex-col gap-6 sm:flex-row sm:items-end">
      <fieldset>
        <legend class="mb-3 font-mono text-xs tracking-widest text-muted uppercase">
          {{ $t('projects.filters.category') }}
        </legend>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            :class="[pillBase, category === null ? pillOn : pillOff]"
            :aria-pressed="category === null"
            @click="category = null"
          >
            {{ $t('projects.filters.allCategories') }}
          </button>
          <button
            v-for="c in categories"
            :key="c"
            type="button"
            :class="[pillBase, category === c ? pillOn : pillOff]"
            :aria-pressed="category === c"
            @click="category = c"
          >
            {{ $t(`categories.${c}`) }}
          </button>
        </div>
      </fieldset>

      <div class="flex flex-col">
        <label
          for="tech-filter"
          class="mb-3 font-mono text-xs tracking-widest text-muted uppercase"
        >
          {{ $t('projects.filters.technology') }}
        </label>
        <select
          id="tech-filter"
          v-model="technology"
          class="min-w-56 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <option :value="null">{{ $t('projects.filters.allTechnologies') }}</option>
          <option v-for="t in technologies" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <p role="status" aria-live="polite" class="font-mono text-sm text-muted">
        {{ $t('projects.filters.results', resultCount) }}
      </p>
      <button
        v-if="hasFilters"
        type="button"
        class="text-sm font-semibold text-accent underline-offset-4 hover:underline"
        @click="reset"
      >
        {{ $t('projects.filters.reset') }}
      </button>
    </div>
  </section>
</template>
