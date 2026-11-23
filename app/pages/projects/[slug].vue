<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: project } = await useProject(slug)
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const { projects } = await useProjects()
const { formatPeriod } = usePeriodFormat()

const nextProject = computed(() => {
  const list = projects.value
  const i = list.findIndex((p) => p.slug === slug.value)
  return i === -1 || list.length < 2 ? null : list[(i + 1) % list.length]
})

const isDev = import.meta.dev
/** Show a block when it has real content, or in dev so placeholders stay visible. */
const show = (value: string) => isDev || !isPlaceholder(value)

const period = computed(() => (project.value ? formatPeriod(project.value.period) : undefined))

const { data: profile } = await useProfile()
usePageSeo({
  title: () => `${project.value?.title ?? ''} | ${profile.value?.name ?? ''}`,
  description: () => project.value?.summary ?? '',
  path: () => `/projects/${slug.value}`,
  type: 'article',
})
</script>

<template>
  <main v-if="project" id="main">
    <article>
      <header class="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
        >
          <AppIcon name="arrow-left" :size="16" />
          {{ $t('caseStudy.back') }}
        </NuxtLink>

        <p class="mt-10 font-mono text-sm tracking-widest text-accent uppercase">
          {{ $t(`categories.${project.category}`) }}
        </p>
        <h1
          class="mt-3 max-w-4xl text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-6xl"
        >
          {{ project.title }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg text-muted text-pretty sm:text-xl">
          {{ project.summary }}
        </p>

        <dl class="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 text-sm sm:grid-cols-4">
          <div v-if="show(project.company)">
            <dt class="font-mono text-xs tracking-widest text-muted uppercase">
              {{ $t('caseStudy.company') }}
            </dt>
            <dd class="mt-1 font-medium"><PlaceholderText :value="project.company" /></dd>
          </div>
          <div v-if="period || isDev">
            <dt class="font-mono text-xs tracking-widest text-muted uppercase">
              {{ $t('caseStudy.period') }}
            </dt>
            <dd class="mt-1 font-medium">
              <template v-if="period">{{ period }}</template>
              <PlaceholderText v-else :value="project.period.start" />
            </dd>
          </div>
          <div>
            <dt class="font-mono text-xs tracking-widest text-muted uppercase">
              {{ $t('caseStudy.category') }}
            </dt>
            <dd class="mt-1 font-medium">{{ $t(`categories.${project.category}`) }}</dd>
          </div>
          <div>
            <dt class="font-mono text-xs tracking-widest text-muted uppercase">
              {{ $t('caseStudy.role') }}
            </dt>
            <dd class="mt-1 font-medium">{{ project.role }}</dd>
          </div>
        </dl>

        <div
          v-if="project.liveUrl || project.repoUrl || project.extraLinks?.length"
          class="mt-6 flex flex-wrap gap-3"
        >
          <AppButton v-if="project.liveUrl" :href="project.liveUrl" external icon="external">
            {{ $t('caseStudy.liveSite') }}
          </AppButton>
          <AppButton
            v-if="project.repoUrl"
            :href="project.repoUrl"
            external
            variant="secondary"
            icon="github"
            icon-position="left"
          >
            {{ $t('caseStudy.repository') }}
          </AppButton>
          <AppButton
            v-for="link in project.extraLinks"
            :key="link.href"
            :href="link.href"
            external
            variant="ghost"
            icon="github"
            icon-position="left"
          >
            {{ link.label }}
          </AppButton>
        </div>
      </header>

      <!-- Real screenshots when the project has them, otherwise an abstract cover. -->
      <section
        v-if="project.images.length"
        :aria-label="$t('caseStudy.screenshots')"
        class="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <figure
          class="overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_60px_-30px_rgb(190_24_93/0.35)]"
        >
          <img
            :src="project.images[0]!.src"
            :alt="project.images[0]!.alt"
            class="w-full"
            fetchpriority="high"
          />
        </figure>
        <div v-if="project.images.length > 1" class="mt-6 grid gap-6 sm:grid-cols-2">
          <figure
            v-for="image in project.images.slice(1)"
            :key="image.src"
            class="flex items-start justify-center overflow-hidden rounded-3xl border border-border bg-surface-2"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              loading="lazy"
              decoding="async"
              class="max-h-[28rem] w-full object-contain object-top"
            />
          </figure>
        </div>
      </section>
      <figure v-else class="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          class="aspect-[16/9] overflow-hidden rounded-3xl border border-border sm:aspect-[21/9]"
        >
          <ProjectCover :slug="project.slug" :category="project.category" :stack="project.stack" />
        </div>
        <figcaption class="mt-3 text-xs text-muted">
          {{ $t('caseStudy.clientWorkNote') }}
        </figcaption>
      </figure>

      <div
        class="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_18rem] lg:gap-20 lg:px-8"
      >
        <div class="space-y-14">
          <section v-if="show(project.problem)" v-reveal aria-labelledby="cs-problem">
            <h2 id="cs-problem" class="case-heading">{{ $t('caseStudy.problem') }}</h2>
            <p class="case-body"><PlaceholderText :value="project.problem" /></p>
          </section>

          <section v-if="show(project.solution)" v-reveal aria-labelledby="cs-solution">
            <h2 id="cs-solution" class="case-heading">{{ $t('caseStudy.solution') }}</h2>
            <p class="case-body"><PlaceholderText :value="project.solution" /></p>
          </section>

          <section v-reveal aria-labelledby="cs-role">
            <h2 id="cs-role" class="case-heading">{{ $t('caseStudy.role') }}</h2>
            <p class="case-body">{{ project.role }}</p>
          </section>

          <section v-if="project.impact.length" v-reveal aria-labelledby="cs-impact">
            <h2 id="cs-impact" class="case-heading">{{ $t('caseStudy.impact') }}</h2>
            <ul class="mt-6 grid gap-4 sm:grid-cols-2">
              <li
                v-for="item in project.impact"
                :key="item"
                class="rounded-2xl border border-border bg-surface p-5 font-medium leading-relaxed"
              >
                <span aria-hidden="true" class="mb-2 block text-accent">↗</span>
                {{ item }}
              </li>
            </ul>
          </section>
        </div>

        <aside class="lg:sticky lg:top-24 lg:self-start">
          <section aria-labelledby="cs-stack">
            <h2 id="cs-stack" class="case-heading">{{ $t('caseStudy.stack') }}</h2>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="tech in project.stack" :key="tech">
                <TagPill tone="accent">{{ tech }}</TagPill>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </article>

    <nav v-if="nextProject" :aria-label="$t('caseStudy.next')" class="border-t border-border">
      <NuxtLink
        :to="`/projects/${nextProject.slug}`"
        class="group mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-12 sm:px-6 lg:px-8"
      >
        <span>
          <span class="block font-mono text-xs tracking-widest text-muted uppercase">
            {{ $t('caseStudy.next') }}
          </span>
          <span
            class="mt-2 block text-2xl font-bold tracking-tight group-hover:text-accent sm:text-3xl"
          >
            {{ nextProject.title }}
          </span>
        </span>
        <AppIcon
          name="arrow-right"
          :size="28"
          class="shrink-0 text-accent transition-transform group-hover:translate-x-1"
        />
      </NuxtLink>
    </nav>
  </main>
</template>

<style scoped>
@reference '~/assets/css/main.css';

.case-heading {
  @apply font-mono text-sm tracking-widest text-accent uppercase;
}
.case-body {
  @apply mt-4 text-lg leading-relaxed text-text text-pretty sm:text-xl;
}
</style>
