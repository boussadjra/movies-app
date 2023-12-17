<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const moviesStore = useMoviesStore()

const currentMovie = computed(() => {
  const movieTitle = useRoute().params.title
  return moviesStore.movies.find((movie) => movie.title === movieTitle)
})
</script>
<template>
  <div class="movie-view">
    <div v-if="currentMovie" class="movie-details">
      <h1>{{ currentMovie.title }}</h1>
      <div class="movie-details__desc">{{ currentMovie.description }}</div>
      <div class="movie-details__year">{{ currentMovie.year }}</div>
      <div class="movie-details__actors">
        <h2>Actors :</h2>
        <div class="movie-details__actor" v-for="actor in currentMovie.actors" :key="actor.name">
          <div class="movie-details__actor-name">{{ actor.name }}</div>
          <div class="movie-details__actor-age">{{ actor.age }}</div>
          <div class="movie-details__actor-join-date">{{ actor.joinDate }}</div>
          <div class="movie-details__actor-role">{{ actor.role }}</div>
        </div>
      </div>
    </div>
    <div v-else>Movie not found</div>

    <div>
      <router-link to="/" class="link btn btn-primary"> Back to movies list </router-link>
    </div>
  </div>
</template>

<style>
.movie-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #222233;
  width: fit-content;
  padding: 1rem;
  width: 100%;
}
.movie-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #222233;
  max-width: fit-content;
  padding: 1rem;
}

.movie-details__desc {
  margin: 1rem 0;
  opacity: 0.8;
}

.movie-details__actors {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #222244;
  padding: 16px 32px;
}

.movie-details__actor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.movie-details__actor-name {
  font-weight: bold;
}

.movie-details__actor-age {
  font-size: 0.75rem;
}

.movie-details__actor-join-date {
  font-size: 0.75rem;
}

.movie-details__actor-role {
  font-size: 0.75rem;
}
</style>
