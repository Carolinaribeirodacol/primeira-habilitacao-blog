<template>
  <q-page class="page-lessons-single" v-if="lessonValues">
    <q-img
      class="page-lessons-single__image full-width"
      :src="lessonValues.image"
      alt="page-lessons-single-image"
    />

    <div class="page-lessons-single__content q-pa-md">
      <h1 class="page-lessons-single__title text-indigo-10 text-weight-bold text-h5">{{ lessonValues.title }}</h1>

      <p>
        {{ lessonValues.description }}
      </p>

      <q-badge outline class="page-lessons-single__badge" color="blue">
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

defineOptions({ name: 'LessonsSingle' })

const route = useRoute()
const lessonStore = useLessonStore()

const lessonValues = computed(() => lessonStore.getLessonById(route.params.id))

onMounted(() => { lessonStore.getLessonById(route.params.id) })
</script>

<style lang="scss">
.page-lessons-single {
  &__image {
    height: 200px;
  }
}
</style>
