<template>
  <div class="lessons">
    <h3 class="lessons__title">Todas as aulas</h3>

    <div class="lessons__cards">
      <card-component
        v-for="lesson in lessons"
        :key="lesson.id"
        :image="lesson.image"
        :title="lesson.title"
        :category="lesson.category"
        :description="lesson.description"
        class="lessons__card"
      />
    </div>
  </div>
</template>

<script setup>
import { useLessonStore } from 'src/stores/lessonStore'
import { onMounted, computed } from 'vue'
import CardComponent from '../components/CardComponent.vue'

defineOptions({
  name: 'LessonList'
});

const lessonStore = useLessonStore()
const lessons = computed(() => lessonStore.lessons)

onMounted(() => {
  lessonStore.fetchLessons()
})
</script>

<style lang="scss">
.lessons {
  padding: 1rem;

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #103778;
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__card {
    flex: 1 1 calc(25% - 1rem);
    max-width: 250px;
    min-width: 200px;
    min-height: 300px;
    box-sizing: border-box;
    padding: 1rem;
  }
}
</style>
