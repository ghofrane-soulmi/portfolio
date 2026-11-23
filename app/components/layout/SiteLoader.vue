<script setup lang="ts">
/*
 * Intro loader shown while the app boots. It only appears when JavaScript runs:
 * an inline script in nuxt.config adds `is-loading` to <html> before first
 * paint (with a 4 s safety timeout), and this component removes it once the
 * app is mounted. The page itself is fully rendered underneath, so content,
 * SEO and no-JS visitors are unaffected.
 */
const MIN_VISIBLE_MS = 700

onMounted(() => {
  const html = document.documentElement
  if (!html.classList.contains('is-loading')) return

  const wait = Math.max(0, MIN_VISIBLE_MS - performance.now())

  window.setTimeout(() => {
    html.classList.add('is-loaded')
    window.setTimeout(() => html.classList.remove('is-loading', 'is-loaded'), 600)
  }, wait)
})
</script>

<template>
  <div class="site-loader" role="status" aria-live="polite">
    <span class="sr-only">Loading</span>
    <div class="relative flex flex-col items-center gap-6" aria-hidden="true">
      <div class="relative">
        <span class="loader-halo absolute inset-0 rounded-[1.75rem]" />
        <span
          class="loader-logo font-display relative inline-flex size-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-accent to-accent-2 text-4xl font-bold text-white shadow-[0_18px_40px_-14px_rgb(190_24_93/0.7)]"
          >G</span
        >
      </div>
      <p class="font-display text-xl font-bold tracking-tight text-text">
        ghofrane<span class="text-accent">.dev</span>
      </p>
      <div class="h-1 w-40 overflow-hidden rounded-full bg-accent-soft">
        <span class="loader-bar block h-full w-1/3 rounded-full" />
      </div>
    </div>
  </div>
</template>

<style>
/* Global (not scoped): visibility is driven by classes on <html>. */
.site-loader {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: none;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(40rem 40rem at 20% 20%, rgb(190 24 93 / 0.1), transparent 60%),
    radial-gradient(36rem 36rem at 85% 75%, rgb(167 139 250 / 0.18), transparent 60%), var(--c-bg);
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
}
html.is-loading .site-loader {
  display: flex;
}
html.is-loading.is-loaded .site-loader {
  opacity: 0;
  visibility: hidden;
}
html.is-loading:not(.is-loaded) {
  overflow: hidden;
}

.loader-logo {
  animation: loader-pop 1.6s ease-in-out infinite;
}
.loader-halo {
  background: linear-gradient(135deg, var(--c-accent), var(--c-accent-2));
  filter: blur(18px);
  opacity: 0.45;
  animation: loader-halo 1.6s ease-in-out infinite;
}
.loader-bar {
  background: linear-gradient(90deg, var(--c-accent), var(--c-accent-2));
  animation: loader-slide 1.1s ease-in-out infinite;
}

@keyframes loader-pop {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-6px) rotate(-6deg);
  }
}
@keyframes loader-halo {
  0%,
  100% {
    transform: scale(0.9);
    opacity: 0.35;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.6;
  }
}
@keyframes loader-slide {
  0% {
    transform: translateX(-110%);
  }
  100% {
    transform: translateX(330%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-logo,
  .loader-halo,
  .loader-bar {
    animation: none;
  }
}
</style>
