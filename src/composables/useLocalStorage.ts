import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const initial = stored ? JSON.parse(stored) : defaultValue
  const value = ref<T>(initial)
  watch(
    value,
    (val) => {
      localStorage.setItem(key, JSON.stringify(val))
    },
    { deep: true }
  )
  return value
}
