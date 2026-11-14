<script setup lang="ts">
const { data: profile } = await useProfile()
</script>

<template>
  <PageSection
    v-if="profile"
    id="about"
    :eyebrow="$t('about.eyebrow')"
    :title="$t('about.title')"
  >
    <div class="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <p v-reveal class="text-lg leading-relaxed text-muted text-pretty sm:text-xl">
        {{ profile.bio }}
      </p>

      <aside v-reveal="100" class="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div>
          <h3 class="font-mono text-xs tracking-widest text-muted uppercase">
            {{ $t('about.location') }}
          </h3>
          <p class="mt-2 inline-flex items-center gap-2 font-medium">
            <AppIcon name="map-pin" :size="16" class="text-accent" />
            {{ profile.location }}
          </p>
        </div>
        <div>
          <h3 class="font-mono text-xs tracking-widest text-muted uppercase">
            {{ $t('about.languages') }}
          </h3>
          <ul class="mt-3 space-y-2">
            <li
              v-for="lang in profile.languages"
              :key="lang.name"
              class="flex items-baseline justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0"
            >
              <span class="font-medium">{{ lang.name }}</span>
              <span class="font-mono text-sm text-muted">{{ lang.level }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </PageSection>
</template>
