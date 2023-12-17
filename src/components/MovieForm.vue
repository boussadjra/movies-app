<script setup lang="ts">
import { computed } from 'vue'
import { Form, Field, FieldArray, ErrorMessage } from 'vee-validate'
import type { Movie, Actor } from '@/types/Movie'
import { roles } from '@/types/Movie'
import { IconTrash } from '@/components/icons'
import * as yup from 'yup'

type MovieFormMode = 'add' | 'edit'

const props = withDefaults(
  defineProps<{
    mode: MovieFormMode
    initialValues?: Movie | null
  }>(),
  {
    mode: 'add',
    initialValues: null
  }
)

const actor: Actor = {
  name: '',
  age: 0,
  joinDate: new Date(),
  role: null
}

const initialValues = computed(() => {
  return props.mode === 'add'
    ? {
        title: '',
        description: '',
        year: 0,
        actors: [actor]
      }
    : props.initialValues
})

const emit = defineEmits<{
  (event: 'submit', values: Movie): void
}>()

function submit(values: Movie) {
  emit('submit', values)
}

const validationSchema = yup.object({
  title: yup.string().required(),
  year: yup.number().required(),
  actors: yup.array().of(
    yup.object({
      name: yup.string().required().label('Actor name'),
      age: yup.number().required().label('Actor age'),
      joinDate: yup.date().required().label('Actor join date'),
      role: yup.string().required().label('Actor role')
    })
  )
})
</script>
<template>
  <div class="movie-form-wrapper">
    <!-- @vue-ignore -->
    <Form
      class="movie-form"
      @submit="submit"
      :initialValues="initialValues"
      :validationSchema="validationSchema"
    >
      <h3>Movie</h3>
      <div class="form-input required movie-form-title">
        <label for="title">Title</label>
        <Field name="title" type="text" />
        <ErrorMessage name="title" class="form-error" />
      </div>
      <div class="form-input movie-form-desc">
        <label for="description">Description</label>
        <Field name="description" type="text" />
      </div>
      <div class="form-input required movie-form-year">
        <label for="year">Year</label>
        <Field name="year" type="number" />
        <ErrorMessage name="year" class="form-error" />
      </div>
      <div class="movie-form-actors">
        <h3>Actors</h3>
        <FieldArray name="actors">
          <template #default="{ fields, push, remove }">
            <div class="movie-form-actor" v-for="(field, index) in fields" :key="field.key">
              <div class="form-input required movie-form-actor-name">
                <label :for="`actors[${index}].name`">Name</label>
                <Field :name="`actors[${index}].name`" type="text" />
                <ErrorMessage :name="`actors[${index}].name`" class="form-error" />
              </div>
              <div class="form-input required movie-form-actor-age">
                <label :for="`actors[${index}].age`">Age</label>
                <Field :name="`actors[${index}].age`" type="number" />
                <ErrorMessage :name="`actors[${index}].age`" class="form-error" />
              </div>
              <div class="form-input required movie-form-actor-join-date">
                <label :for="`actors[${index}].joinDate`">Join Date</label>
                <Field :name="`actors[${index}].joinDate`" type="date" />
                <ErrorMessage :name="`actors[${index}].joinDate`" class="form-error" />
              </div>
              <div class="form-input required movie-form-actor-role">
                <label :for="`actors[${index}].role`">Role</label>
                <Field :name="`actors[${index}].role`" as="select">
                  <option value="">Select a role</option>
                  <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                </Field>
                <ErrorMessage :name="`actors[${index}].role`" class="form-error" />
              </div>

              <button class="btn btn-danger w-fit" type="button" @click="remove(index)">
                <IconTrash />
              </button>
            </div>
            <button class="btn btn-secondary" type="button" @click="push(actor)">Add Actor</button>
          </template>
        </FieldArray>
      </div>
      <button class="btn btn-primary" type="submit">
        {{ mode === 'add' ? 'Add' : 'Update' }} Movie
      </button>
    </Form>
    <router-link class="btn btn-secondary" to="/"> Movies List </router-link>
  </div>
</template>
<style>
.form-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.form-input.required::after {
  content: '*';
  color: #ff7777;
  position: absolute;
  right: 4px;
  top: 8px;
}

.form-error {
  color: #ff7777;
}

.movie-form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.movie-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 320px;
}

.movie-form-actors {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.movie-form-actor {
  display: flex;
  gap: 1rem;
  align-items: end;
}
</style>
