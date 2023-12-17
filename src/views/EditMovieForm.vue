<script setup lang="ts">
import MovieForm from '@/components/MovieForm.vue'
import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const moviesStore = useMoviesStore()

function submit(values: Movie) {
  moviesStore.updateMovie(values)
}

const route = useRoute()

const editedMovie = computed(() => {
  const movieTitle = route.params.title
  return moviesStore.movies.find((movie) => movie.title === movieTitle)
})

console.log('edited movie ', editedMovie, route.params.title)
</script>
<template>
  <MovieForm mode="edit" @submit="submit" :initialValues="editedMovie" />
</template>
