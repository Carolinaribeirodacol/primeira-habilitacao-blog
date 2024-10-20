<template>
  <q-page class="lessons">
    <h3 class="lessons__title">Todas as aulas</h3>

    <div class="lessons__cards">
      <card-component
        v-for="lesson in lessons"
        :key="lesson.id"
        :id="lesson.id"
        :image="lesson.image"
        :title="lesson.title"
        :category="lesson.category"
        :description="lesson.description"
        :onClick="goToEditLessonPage"
        class="lessons__card"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useLessonStore } from 'src/stores/lessonStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CardComponent from '../components/CardComponent.vue';

defineOptions({
  name: 'LessonList'
});

const lessonStore = useLessonStore()
const lessons = computed(() => lessonStore.lessons)

onMounted(() => {
  lessonStore.fetchLessons()
})

const router = useRouter();

const goToEditLessonPage = (id) => {
  router.push(`/lessons/${id}/edit`);
}
</script>

<style lang="scss" scoped>
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
