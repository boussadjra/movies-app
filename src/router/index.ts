import { createRouter, createWebHistory } from 'vue-router'

import MoviesList from '@/views/MoviesList.vue'
const AddMovieForm = () => import('@/views/AddMovieForm.vue')
const ViewMovie = () => import('@/views/ViewMovie.vue')
const EditMovieForm = () => import('@/views/EditMovieForm.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MoviesList',
      component: MoviesList
    },
    {
      path: '/add',
      name: 'AddMovieForm',
      component: AddMovieForm
    },
    {
      path: '/movie/:title',
      name: 'ViewMovie',
      component: ViewMovie
    },
    {
      path: '/edit/:title',
      name: 'EditMovieForm',
      component: EditMovieForm
    }
  ]
})

export default router
