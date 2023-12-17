<script setup lang="ts">
import MovieForm from '@/components/MovieForm.vue'
import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types'

const moviesStore = useMoviesStore()

function submit(values: Movie) {
  moviesStore.addMovie(values)
}
</script>
<template>
  <MovieForm mode="add" @submit="submit" />
</template>
