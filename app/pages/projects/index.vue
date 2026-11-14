<script setup lang="ts">
import type { ProjectCategory } from '#shared/types'

const { projects, technologies, categories } = await useProjects()

const route = useRoute()
const router = useRouter()

const category = ref<ProjectCategory | null>(null)
const technology = ref<string | null>(null)

const results = computed(() =>
  filterProjects(projects.value, { category: category.value, technology: technology.value }),
)

// Filters live in the URL (?category=…&tech=…) so a filtered view can be shared.
// Read after mount: the page is prerendered without a query string.
onMounted(() => {
  const q = route.query
  const c = typeof q.category === 'string' ? q.category : null
  const t = typeof q.tech === 'string' ? q.tech : null
  if (c && (categories.value as string[]).includes(c)) category.value = c as ProjectCategory
  if (t && technologies.value.includes(t)) technology.value = t

  watch([category, technology], ([c2, t2]) => {
    const query: Record<string, string> = {}
    if (c2) query.category = c2
    if (t2) query.tech = t2
    router.replace({ query })
  })
})
</script>

<template>
  <main id="main" class="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-20 lg:px-8">
    <SectionHeading :eyebrow="$t('projects.eyebrow')" :title="$t('projects.allTitle')" level="h1">
      <p class="mt-5 text-lg text-muted">{{ $t('projects.allIntro') }}</p>
    </SectionHeading>

    <ProjectFilters
      v-model:category="category"
      v-model:technology="technology"
      :categories="categories"
      :technologies="technologies"
      :result-count="results.length"
    />

    <ul v-if="results.length" class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in results" :key="project.id">
        <ProjectCard :project="project" heading-level="h2" />
      </li>
    </ul>
    <p
      v-else
      class="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted"
    >
      {{ $t('projects.filters.empty') }}
    </p>
  </main>
</template>
