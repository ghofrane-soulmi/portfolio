<script setup lang="ts">
const { data: groups } = await useSkills()
</script>

<template>
  <PageSection id="skills" :eyebrow="$t('skills.eyebrow')" :title="$t('skills.title')">
    <div class="grid gap-5 sm:grid-cols-2">
      <article
        v-for="(group, index) in groups"
        :key="group.id"
        v-reveal="index * 80"
        class="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60 sm:p-8"
      >
        <h3 class="flex items-center gap-3 text-lg font-semibold">
          <span class="font-mono text-sm text-accent">{{
            String(index + 1).padStart(2, '0')
          }}</span>
          {{ group.title }}
        </h3>
        <ul class="mt-5 flex flex-wrap gap-2">
          <li v-for="skill in group.skills" :key="skill">
            <TagPill>{{ skill }}</TagPill>
          </li>
        </ul>
      </article>
    </div>
  </PageSection>
</template>
