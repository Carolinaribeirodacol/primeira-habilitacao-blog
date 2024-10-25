<template>
  <q-page class="lesson-view" v-if="lesson">
    <q-img
      class="lesson-view__image full-width"
      :src="lesson.image"
      alt="lesson-view-image"
    />

    <div class="lesson-view__content q-pa-md">
      <h1 class="lesson-view__title text-weight-bold text-h5">{{ lesson.title }}</h1>

      <p>
        {{ lesson.description }}
      </p>

      <q-badge outline class="lesson-view__badge" color="blue">
        {{ lesson.category }}
      </q-badge>
    </div>
  </q-page>
  <div v-else>
    Carregando aula...
  </div>
</template>

<script setup>
import { useLessonStore } from 'src/stores/lessonStore'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'LessonView' })

const route = useRoute()
const lessonStore = useLessonStore()

const lessonId = computed(() => route.params.id)
const lesson = computed(() => lessonStore.getLessonById(lessonId.value))

onMounted(() => {
  if (!lesson.value) {
    lessonStore.fetchLessonById(lessonId.value)
  }
})
</script>

<style lang="scss">
.lesson-view {
  &__image {
    height: 200px;
  }

  &__title {
    color: $indigo-10;
  }
}
</style>
