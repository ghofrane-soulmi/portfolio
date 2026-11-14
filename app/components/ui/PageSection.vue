<script setup lang="ts">
const props = defineProps<{
  id: string
  eyebrow: string
  title: string
}>()
const headingId = computed(() => `${props.id}-title`)
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="headingId"
    class="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
  >
    <SectionHeading :id="headingId" :eyebrow="eyebrow" :title="title">
      <slot name="intro" />
    </SectionHeading>
    <slot />
  </section>
</template>
