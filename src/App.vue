<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="">
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #222233;
  width: fit-content;
  padding: 4rem 1rem;
  width: 100%;
}
</style>
