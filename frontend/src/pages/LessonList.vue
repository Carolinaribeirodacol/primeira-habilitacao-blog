<template>
  <q-page padding class="page-page-lesson-list">
    <div class="page-lesson-list__header flex align-center justify-between">
      <h3 class="page-lesson-list__title text-h4 text-weight-bold text-indigo-10">Todas as aulas</h3>

      <q-btn @click="goToCreatePage" icon="add" label="Nova aula" flat color="positive" />
    </div>

    <div class="page-lesson-list__cards row wrap justify-center q-gutter-md">
      <app-lesson-card
        v-for="lesson in lessons"
        :key="lesson.id"
        :id="lesson.id"
        :image="lesson.image"
        :title="lesson.title"
        :category="lesson.category"
        :description="lesson.description"
        class="page-lesson-list__card"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useLessonStore } from 'src/stores/lessonStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLessonCard from '../components/AppLessonCard.vue'

defineOptions({ name: 'LessonList' })

const lessonStore = useLessonStore()
const lessons = computed(() => lessonStore.lessons)

onMounted(() => {
  lessonStore.getLessons()
})

const router = useRouter()

const goToCreatePage = () => {
  router.push({ name: 'LessonNew' })
}
</script>

<style lang="scss">
.page-lesson-list {
  &__card {
    flex: 1 1 calc(25% - 1rem);
    max-width: 250px;
    min-width: 200px;
    min-height: 300px;
    box-sizing: border-box;
  }
}
</style>
