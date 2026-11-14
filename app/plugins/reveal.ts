import type { Directive } from 'vue'

/**
 * v-reveal: fades an element in when it scrolls into view.
 * The hidden state is only applied once JS runs, so content stays visible
 * without JS and in the prerendered HTML. Respects prefers-reduced-motion via CSS.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    return observer
  }

  const reveal: Directive<HTMLElement, number | undefined> = {
    mounted(el, binding) {
      if (!('IntersectionObserver' in window)) return
      // Elements already on screen at load stay visible (no flash).
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) return
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`
      el.classList.add('reveal')
      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
    getSSRProps() {
      return {}
    },
  }

  nuxtApp.vueApp.directive('reveal', reveal)
})

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: Directive<HTMLElement, number | undefined>
  }
}
