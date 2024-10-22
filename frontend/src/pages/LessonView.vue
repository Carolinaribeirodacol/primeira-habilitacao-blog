<template>
  <q-page class="lesson" v-if="lesson">
    <q-img
      class="lesson__image"
      :src="lesson.image"
      alt="lesson-image"
    />
    <div class="lesson__content">
      <h1 class="lesson__title">{{ lesson.title }}</h1>
      <p>
        {{ lesson.description }}
      </p>
      <q-badge outline class="lesson__badge" color="blue">
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

defineOptions({
  name: 'LessonView'
})

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

<style lang="scss" scoped>
  .lesson {
    &__image {
      width: 100%;
      height: 200px;
    }

    &__content {
      padding: 1rem;
    }

    &__title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #103778;
      margin: 0;
    }

    &__badge {
      margin-top: auto;
      align-self: flex-start;
    }
  }
</style>
