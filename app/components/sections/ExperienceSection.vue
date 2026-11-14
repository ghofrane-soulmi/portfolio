<script setup lang="ts">
const { data: items } = await useExperience()
const { formatPeriod } = usePeriodFormat()
</script>

<template>
  <PageSection id="experience" :eyebrow="$t('experience.eyebrow')" :title="$t('experience.title')">
    <ol class="relative ml-1.5 border-l border-border sm:ml-2">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        v-reveal="index * 80"
        class="relative pb-14 pl-8 last:pb-0 sm:pl-12"
      >
        <!-- Timeline marker -->
        <span
          aria-hidden="true"
          class="absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-accent bg-bg"
          :class="{ 'bg-accent': item.period.end === null }"
        />

        <div class="grid gap-4 lg:grid-cols-[14rem_1fr] lg:gap-10">
          <p class="font-mono text-sm text-muted">
            <time :datetime="item.period.start">{{ formatPeriod(item.period) }}</time>
            <span class="mt-1 block">{{ item.location }}</span>
          </p>

          <div>
            <h3 class="text-xl font-semibold sm:text-2xl">
              {{ item.role }}
              <span class="text-accent">·</span>
              <span class="text-muted">
                <template v-for="(company, i) in item.companies" :key="company">
                  <template v-if="i > 0">
                    <span aria-hidden="true"> → </span>
                    <span class="sr-only">{{ $t('experience.then') }}</span>
                  </template>
                  {{ company }}
                </template>
              </span>
            </h3>
            <p v-if="item.note" class="mt-2 text-sm text-muted italic">{{ item.note }}</p>

            <ul class="mt-5 space-y-3">
              <li
                v-for="highlight in item.highlights"
                :key="highlight"
                class="relative pl-6 leading-relaxed text-muted"
              >
                <span aria-hidden="true" class="absolute top-[0.7em] left-0 h-px w-3 bg-accent" />
                {{ highlight }}
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ol>
  </PageSection>
</template>
