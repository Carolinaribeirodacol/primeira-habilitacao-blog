<template>
  <q-page class="page-page-lesson-view" v-if="lessonValues">
    <q-img
      class="page-lesson-view__image full-width"
      :src="lessonValues.image"
      alt="page-lesson-view-image"
    />

    <div class="page-lesson-view__content q-pa-md">
      <h1 class="page-lesson-view__title text-indigo-10 text-weight-bold text-h5">{{ lessonValues.title }}</h1>

      <p>
        {{ lessonValues.description }}
      </p>

      <q-badge outline class="page-lesson-view__badge" color="blue">
        {{ lessonValues.category }}
      </q-badge>
    </div>
  </q-page>

  <div v-else>
    <app-loading />
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
const lessonValues = computed(() => lessonStore.getLessonById(lessonId.value))

onMounted(() => { lessonStore.getLessonById(lessonId.value) })
</script>

<style lang="scss">
.page-lesson-view {
  &__image {
    height: 200px;
  }
}
</style>
