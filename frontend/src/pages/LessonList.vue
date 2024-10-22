<template>
  <q-page padding class="lessons">
    <div class="lessons__header">
      <h3 class="lessons__title">Todas as aulas</h3>
      <q-btn :onClick="goToCreatePage" icon="add" label="Nova aula" flat type="submit" color="positive" />
    </div>

    <div class="lessons__cards">
      <lesson-card
        v-for="lesson in lessons"
        :key="lesson.id"
        :id="lesson.id"
        :image="lesson.image"
        :title="lesson.title"
        :category="lesson.category"
        :description="lesson.description"
        :onEdit="goToEditLessonPage"
        :onDelete="() => deleteCard(lesson.id)"
        :onClick="goToViewPage"
        class="lessons__card"
      />
    </div>

    <QaDialog />
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar';
import { useDialogStore } from 'src/stores/dialogStore';
import { useLessonStore } from 'src/stores/lessonStore';
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import LessonCard from '../components/LessonCard.vue';
import QaDialog from '../components/QaDialog.vue';

defineOptions({
  name: 'LessonList'
});

  const lessonStore = useLessonStore();
  const lessons = computed(() => lessonStore.lessons);

  onMounted(() => {
    lessonStore.getLessons();
  });

  const router = useRouter();

  const goToEditLessonPage = (id) => {
    router.push(`/lessons/${id}/edit`);
  };

  const goToViewPage = (id) => {
    router.push(`/lessons/${id}/view`);
  }

  const goToCreatePage = () => {
    router.push(`/lessons/new`);
  }

  const dialogStore = useDialogStore();

  const deleteCard = (id) => {
    dialogStore.openDialog();

    watch(
      () => dialogStore.confirmed,
      async (confirmed) => {
        if (confirmed) {
          try {
            await lessonStore.deleteLesson(id);

            Notify.create({
              type: 'positive',
              message: 'Lição deletada com sucesso!',
              position: 'top-right'
            });
          } catch (error) {
            console.log(error);
            Notify.create({
              type: 'negative',
              message: 'Não foi possível deletar a lição!',
              position: 'top-right'
            });
          }
        }
      },
      { immediate: false }
    );
  }
</script>

<style lang="scss" scoped>
  .lessons {

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #103778;
    }

    &__cards {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    &__card {
      flex: 1 1 calc(25% - 1rem);
      max-width: 250px;
      min-width: 200px;
      min-height: 300px;
      box-sizing: border-box;
    }
  }
</style>
