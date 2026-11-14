<template>
  <div id="top" class="flex min-h-dvh flex-col">
    <SkipLink />
    <SiteHeader />
    <div class="flex-1">
      <slot />
    </div>
    <SiteFooter />
  </div>
</template>
