<script setup lang="ts">
const { data: profile } = await useProfile()
</script>

<template>
  <main id="main">
    <h1>{{ profile?.name }}</h1>
  </main>
</template>
