<script setup lang="ts">
const { data: profile } = await useProfile()
</script>

<template>
  <section
    v-if="profile"
    aria-labelledby="hero-title"
    class="relative isolate overflow-hidden"
  >
    <!-- Decorative background: grid + soft accent glow -->
    <div aria-hidden="true" class="hero-grid pointer-events-none absolute inset-0 -z-10" />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
    />

    <div
      class="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8"
    >
      <p class="mb-4 font-mono text-sm text-accent sm:text-base">{{ $t('hero.greeting') }}</p>
      <h1
        id="hero-title"
        class="text-5xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-7xl lg:text-8xl"
      >
        {{ profile.name }}
      </h1>
      <p class="mt-6 max-w-2xl text-xl text-muted text-pretty sm:text-2xl">
        {{ profile.title }}
      </p>
      <p class="mt-4 inline-flex items-center gap-2 text-sm text-muted">
        <AppIcon name="map-pin" :size="16" />
        {{ profile.location }}
      </p>

      <div class="mt-10 flex flex-wrap gap-3">
        <AppButton to="/#projects" icon="arrow-right">{{ $t('hero.viewProjects') }}</AppButton>
        <AppButton :href="profile.cvUrl" download variant="secondary" icon="download">
          {{ $t('hero.downloadCv') }}
        </AppButton>
        <AppButton to="/#contact" variant="ghost">{{ $t('hero.contactMe') }}</AppButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(to right, var(--c-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--c-border) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%);
  opacity: 0.45;
}
</style>
