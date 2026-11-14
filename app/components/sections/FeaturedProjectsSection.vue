<script setup lang="ts">
const { featured } = await useProjects()
</script>

<template>
  <PageSection
    id="projects"
    :eyebrow="$t('projects.eyebrow')"
    :title="$t('projects.featuredTitle')"
  >
    <ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <li v-for="(project, index) in featured" :key="project.id" v-reveal="index * 100">
        <ProjectCard :project="project" />
      </li>
    </ul>
    <div v-reveal class="mt-12 flex justify-center">
      <AppButton to="/projects" variant="secondary" icon="arrow-right">
        {{ $t('projects.viewAll') }}
      </AppButton>
    </div>
  </PageSection>
</template>
