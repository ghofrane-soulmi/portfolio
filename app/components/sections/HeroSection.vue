<script setup lang="ts">
import type { IconName } from '~/utils/icons'

const { data: profile } = await useProfile()

const TECH = ['Laravel', 'Vue.js 3', 'TypeScript', 'MySQL', 'REST APIs', 'WebSockets']

const socials = computed(() => {
  const links = profile.value?.links
  if (!links) return []
  return [
    { key: 'github', icon: 'github' as IconName, href: filled(links.github), label: 'GitHub' },
    {
      key: 'linkedin',
      icon: 'linkedin' as IconName,
      href: filled(links.linkedin),
      label: 'LinkedIn',
    },
    { key: 'email', icon: 'mail' as IconName, href: `mailto:${links.email}`, label: 'Email' },
  ].filter((s) => s.href)
})
</script>

<template>
  <section v-if="profile" aria-labelledby="hero-title" class="relative isolate overflow-hidden">
    <!-- Decorative background: soft grid, rose / lavender / peach glows and floating shapes -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="hero-grid absolute inset-0" />
      <div class="absolute -top-40 -left-32 size-[36rem] rounded-full bg-accent/15 blur-3xl" />
      <div class="absolute top-0 -right-32 size-[32rem] rounded-full bg-accent-2/25 blur-3xl" />
      <div
        class="absolute -bottom-40 left-1/3 size-[28rem] rounded-full bg-[#fbcfe8]/40 blur-3xl dark:bg-accent/10"
      />

      <span
        class="float-a absolute top-[18%] left-[8%] size-12 rotate-12 rounded-2xl border border-accent/20 bg-accent/10 backdrop-blur-sm"
      />
      <span
        class="float-b absolute top-[14%] right-[10%] size-16 -rotate-6 rounded-3xl border border-accent-2/30 bg-accent-2/20 backdrop-blur-sm"
      />
      <span
        class="float-c absolute top-[26%] right-[5%] size-24 rounded-full border-2 border-dashed border-accent/25"
      />
      <span
        class="float-b absolute bottom-[18%] left-[6%] size-20 rounded-3xl border border-[#fbcfe8] bg-[#fce7f3]/60 dark:border-accent/20 dark:bg-accent/10"
      />
      <span
        class="float-a absolute right-[14%] bottom-[22%] size-10 rounded-full border border-accent-2/40 bg-accent-2/15"
      />
      <span class="sparkle absolute top-[38%] left-[16%] text-2xl text-accent/40">✦</span>
      <span
        class="sparkle absolute right-[20%] bottom-[34%] text-xl text-accent-2/60 [animation-delay:1.2s]"
        >✦</span
      >
    </div>

    <div
      class="mx-auto flex min-h-[min(calc(100dvh-4rem),54rem)] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8"
    >
      <p
        class="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur"
      >
        <span class="inline-flex items-center gap-1.5 text-accent">
          <AppIcon name="map-pin" :size="15" />
          {{ profile.location }}
        </span>
        <span aria-hidden="true" class="h-4 w-px bg-border" />
        <span class="inline-flex items-center gap-2 text-muted">
          <span class="relative flex size-2" aria-hidden="true">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60"
            />
            <span class="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {{ $t('hero.available') }}
        </span>
      </p>

      <h1
        id="hero-title"
        class="font-display mt-8 text-5xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-7xl lg:text-8xl"
      >
        <span class="text-text">{{ $t('hero.iam') }}</span>
        {{ ' ' }}
        <span class="text-gradient-hero">{{ profile.name }}</span>
      </h1>

      <p class="font-display mt-6 text-xl font-semibold text-accent sm:text-3xl">
        {{ $t('hero.tagline') }}
      </p>

      <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
        {{ $t('hero.intro') }}
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <AppButton to="/#projects" icon="arrow-right">{{ $t('hero.viewProjects') }}</AppButton>
        <AppButton to="/#contact" variant="secondary">{{ $t('hero.contactMe') }}</AppButton>
        <AppButton :href="profile.cvUrl" download variant="ghost" icon="download">
          {{ $t('hero.downloadCv') }}
        </AppButton>
      </div>

      <ul class="mt-10 flex flex-wrap justify-center gap-2" :aria-label="$t('skills.title')">
        <li
          v-for="tech in TECH"
          :key="tech"
          class="rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-text shadow-sm backdrop-blur"
        >
          {{ tech }}
        </li>
      </ul>

      <ul
        v-if="socials.length"
        class="mt-8 flex justify-center gap-3"
        :aria-label="$t('hero.social')"
      >
        <li v-for="s in socials" :key="s.key">
          <a
            :href="s.href"
            :target="s.key === 'email' ? undefined : '_blank'"
            :rel="s.key === 'email' ? undefined : 'noopener noreferrer'"
            :aria-label="s.label"
            :title="s.label"
            class="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-sm transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <AppIcon :name="s.icon" :size="20" />
          </a>
        </li>
      </ul>

      <NuxtLink
        to="/#about"
        class="mt-14 inline-flex flex-col items-center gap-1 text-xs text-muted hover:text-accent"
        :aria-label="$t('hero.scroll')"
      >
        <span
          class="bounce-down inline-flex size-9 items-center justify-center rounded-full border border-border"
        >
          <AppIcon name="arrow-right" :size="16" class="rotate-90" />
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(to right, var(--c-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--c-border) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 35%, black 10%, transparent 60%);
  opacity: 0.45;
}

.text-gradient-hero {
  background-image: linear-gradient(
    100deg,
    var(--c-accent) 0%,
    #db2777 40%,
    var(--c-grad-end) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -14px;
  }
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.35;
    scale: 1;
  }
  50% {
    opacity: 1;
    scale: 1.25;
  }
}
@keyframes bounce-down {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 6px;
  }
}
.float-a {
  animation: float 7s ease-in-out infinite;
}
.float-b {
  animation: float 9s ease-in-out infinite 1s;
}
.float-c {
  animation: float 11s ease-in-out infinite 0.5s;
}
.sparkle {
  animation: twinkle 3.2s ease-in-out infinite;
}
.bounce-down {
  animation: bounce-down 2s ease-in-out infinite;
}

@media (max-width: 639px) {
  .float-c,
  .sparkle {
    display: none;
  }
}
</style>
