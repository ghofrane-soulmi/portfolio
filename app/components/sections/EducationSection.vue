<script setup lang="ts">
const { data: items } = await useEducation()
const { formatPeriod } = usePeriodFormat()
</script>

<template>
  <PageSection id="education" :eyebrow="$t('education.eyebrow')" :title="$t('education.title')">
    <ul class="grid gap-5 md:grid-cols-2">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        v-reveal="index * 80"
        class="flex flex-col rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <p class="font-mono text-sm text-accent">{{ formatPeriod(item.period) }}</p>
        <h3 class="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{{ item.degree }}</h3>
        <p class="mt-1 text-lg text-text">{{ item.field }}</p>
        <p v-if="item.specialization" class="mt-2 text-sm text-muted">
          {{ $t('education.specialization', { name: item.specialization }) }}
        </p>
        <p class="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-6 text-sm text-muted">
          <PlaceholderText :value="item.institution" />
          <span v-if="!isPlaceholder(item.institution)" aria-hidden="true">·</span>
          <span class="inline-flex items-center gap-1">
            <AppIcon name="map-pin" :size="14" />{{ item.location }}
          </span>
        </p>
      </li>
    </ul>
  </PageSection>
</template>
