<template>
  <!-- Thin rose -> lavender bar at the top during page navigations. -->
  <NuxtLoadingIndicator
    color="linear-gradient(90deg, #be185d, #db2777, #a78bfa)"
    :height="3"
    :throttle="100"
  />
  <SiteLoader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
