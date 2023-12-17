<script setup lang="ts">
import { computed, ref } from 'vue'

import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types'

const moviesStore = useMoviesStore()
const searchQuery = ref('')

const movies = computed(() => {
  return moviesStore.movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      movie.year.toString().includes(searchQuery.value) ||
      movie.actors.length.toString().includes(searchQuery.value)
    )
  })
})

const actorsCount = computed(() => (movie: Movie) => {
  return `${movie.actors.length} actor${movie.actors.length === 1 ? '' : 's'}`
})
</script>
<template>
  <div class="">
    <div class="">
      <h1>Movies List</h1>

      <router-link to="/add" class="link btn btn-primary"> Add movie </router-link>
    </div>

    <input
      class="search-input"
      type="search"
      v-model="searchQuery"
      placeholder="Search..."
      aria-label="Search movies"
    />

    <div class="movies-list">
      <router-link
        class="movies-list__item"
        v-for="movie in movies"
        :key="movie.title"
        :to="`/movie/${movie.title}`"
      >
        <div class="movies-list__item-title">{{ movie.title }}</div>
        <div class="movies-list__item-desc">{{ movie.description }}</div>
        <div class="movies-list__item-year">{{ movie.year }}</div>
        <router-link class="movies-list__item-edit" :to="`/edit/${movie.title}`">Edit</router-link>

        <div class="movies-list__item-actors">
          {{ actorsCount(movie) }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style>
.movies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 600px;
}

.movies-list__item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #334;
  color: #fff;
  position: relative;
}

.movies-list__item-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.movies-list__item-desc {
  font-size: 1.25rem;
  opacity: 0.8;
}

.movies-list__item-year {
  font-size: 1.25rem;
  opacity: 0.7;
}

.movies-list__item-edit {
  font-size: 1.25rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.movies-list__item-actors {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.movies-list__item-actor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #335;
}

.movies-list__item-actor-name {
  font-size: 1.25rem;
}

.movies-list__item-actor-age {
  font-size: 1.25rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.25rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.link {
  text-decoration: none;
}
</style>
