<template>
  <div class="app-lesson-card q-pa-sm rounded-borders hover-shadow cursor-pointer" flat>
    <div class="app-lesson-card__content full-height column justify-between">
      <div class="flex q-gutter-xs justify-end">
        <AppDeleteDialog :lessonId="id" />

        <q-btn @click="editClick" flat color="primary" icon="edit" padding="xs" size="sm" />
      </div>

      <div @click="viewClick">
        <q-img class="app-lesson-card__image rounded-borders q-mt-sm full-width" :src="image" alt="foto lição" />

        <div class="app-lesson-card__title q-mt-xs text-weight-bold overflow-hidden text-truncate">{{ title }}</div>

        <p class="app-lesson-card__description q-mt-xs text-caption text-grey overflow-hidden ellipsis-3">
          {{ description }}
        </p>

        <div>
          <q-badge outline class="app-lesson-card__badge" color="blue">
            {{ category }}
          </q-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppDeleteDialog from './AppDeleteDialog.vue'
defineOptions({ name: 'AppLessonCard' })

const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    default: null
  },

  image: {
    type: String,
    default: ''
  },

  category: {
    type: String,
    default: ''
  },

  title: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  }
})

function editClick () {
  router.push({ name: 'LessonEdit', params: { id: props.id } })
}

function viewClick () {
  router.push({ name: 'LessonView', params: { id: props.id } })
}
</script>

<style lang="scss">
.app-lesson-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid $indigo-10;

  &:hover {
    transform: translateY(-2px);
  }

  &__image {
    height: 120px;
  }

  &__title {
    color: $indigo-10;
  }

  &__description {
    height: 60px;
  }
}
</style>
