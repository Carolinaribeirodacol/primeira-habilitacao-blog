<template>
  <div class="app-lesson-card q-pa-sm rounded-borders hover-shadow cursor-pointer" flat>
    <div @click="handleClick" class="app-lesson-card__content full-height column justify-between">
      <div class="flex gutter-xs justify-end">
        <q-btn @click="handleDeleteClick" flat color="negative" icon="delete" padding="xs" size="sm" />

        <q-btn @click="handleEditClick" flat color="primary" icon="edit" padding="xs" size="sm" />
      </div>

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
</template>

<script setup>
import { useRouter } from 'vue-router'
defineOptions({ name: 'AppLessonCard' })

const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    default: 1
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
  },

  delete: {
    type: Function,
    default: () => {}
  }
})

function handleEditClick () {
  router.push(`/lessons/${props.id}/edit`)
}

function handleDeleteClick (event) {
  event.stopPropagation()
  props.delete(props.id)
}

function handleClick () {
  router.push(`/lessons/${props.id}/view`)
}
</script>

<style lang="scss">
.app-lesson-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #151F30;

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
