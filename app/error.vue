<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()

const is404 = computed(() => props.error.statusCode === 404)
const title = computed(() => (is404.value ? t('notFound.title') : t('notFound.errorTitle')))

useHead({ title })
useSeoMeta({ robots: 'noindex, nofollow' })

const goHome = () => clearError({ redirect: '/' })
const goProjects = () => clearError({ redirect: '/projects' })
</script>

<template>
  <NuxtLayout>
    <main
      id="main"
      class="relative isolate mx-auto flex min-h-[70dvh] max-w-6xl flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-8"
    >
      <p
        aria-hidden="true"
        class="pointer-events-none absolute top-1/2 right-4 -z-10 -translate-y-1/2 font-mono text-[10rem] leading-none font-extrabold text-surface-2 select-none sm:text-[16rem]"
      >
        {{ error.statusCode }}
      </p>
      <p class="font-mono text-sm tracking-widest text-accent uppercase">
        {{ is404 ? $t('notFound.code') : error.statusCode }}
      </p>
      <h1 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">{{ title }}</h1>
      <p class="mt-5 max-w-xl text-lg text-muted">
        {{ is404 ? $t('notFound.text') : $t('notFound.errorText') }}
      </p>
      <div class="mt-10 flex flex-wrap gap-3">
        <AppButton icon="arrow-left" icon-position="left" @click="goHome">
          {{ $t('notFound.home') }}
        </AppButton>
        <AppButton variant="secondary" icon="arrow-right" @click="goProjects">
          {{ $t('notFound.projects') }}
        </AppButton>
      </div>
    </main>
  </NuxtLayout>
</template>
