<template>
  <q-page padding class="lesson-list">
    <div class="lesson-list__header">
      <h3 class="lesson-list__title">Todas as aulas</h3>
      <q-btn :onClick="goToCreatePage" icon="add" label="Nova aula" flat type="submit" color="positive" />
    </div>

    <div class="lesson-list__cards row wrap justify-center q-gutter-md">
      <AppLessonCard
        v-for="lesson in lessons"
        :key="lesson.id"
        :id="lesson.id"
        :image="lesson.image"
        :title="lesson.title"
        :category="lesson.category"
        :description="lesson.description"
        :delete="() => deleteCard(lesson.id)"
        class="lesson-list__card"
      />
    </div>

    <AppDialog />
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar'
import { useDialogStore } from 'src/stores/dialogStore'
import { useLessonStore } from 'src/stores/lessonStore'
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppLessonCard from '../components/AppLessonCard.vue'
import AppDialog from '../components/AppDialog.vue'

defineOptions({ name: 'LessonList' })

const lessonStore = useLessonStore()
const lessons = computed(() => lessonStore.lessons)

onMounted(() => {
  lessonStore.getLessons()
})

const router = useRouter()

const goToCreatePage = () => {
  router.push('/lessons/new')
}

const dialogStore = useDialogStore()

const deleteCard = (id) => {
  dialogStore.openDialog()

  watch(
    () => dialogStore.confirmed,
    async (confirmed) => {
      if (confirmed) {
        try {
          await lessonStore.deleteLesson(id)

          Notify.create({
            type: 'positive',
            message: 'Lição deletada com sucesso!',
            position: 'top-right'
          })
        } catch (error) {
          Notify.create({
            type: 'negative',
            message: 'Não foi possível deletar a lição!',
            position: 'top-right'
          })
        }
      }
    },
    { immediate: false }
  )
}
</script>

<style lang="scss">
.lesson-list {
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

  &__card {
    flex: 1 1 calc(25% - 1rem);
    max-width: 250px;
    min-width: 200px;
    min-height: 300px;
    box-sizing: border-box;
  }
}
</style>
