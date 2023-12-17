import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables'
import type { Movie } from '@/types'
export const useMoviesStore = defineStore('movies', () => {
  const movies = useLocalStorage<Movie[]>('movies', [])

  const addMovie = (movie: Movie) => {
    movies.value.push(movie)
  }

  const removeMovie = (movie: Movie) => {
    movies.value = movies.value.filter((m: Movie) => m.title !== movie.title)
  }

  const updateMovie = (movie: Movie) => {
    const index = movies.value.findIndex((m: Movie) => m.title === movie.title)
    movies.value.splice(index, 1, movie)
  }

  return { movies, addMovie, removeMovie, updateMovie }
})
