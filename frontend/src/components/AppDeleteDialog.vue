<template>
  <div>
    <q-btn @click="confirm" flat color="negative" icon="delete" padding="xs" size="sm" />

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="warning" size="4rem" />

          <span class="q-ml-sm">Você realmente deseja deletar esta lição?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />

          <q-btn flat label="Confirmar" color="primary" @click="deleteCard(lessonId)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useLessonStore } from 'src/stores/lessonStore'
import { ref } from 'vue'

defineOptions({ name: 'AppDeleteDialog' })

defineProps({
  lessonId: {
    type: [Number, String],
    default: ''
  }
})

const showDialog = ref(false)
const lessonStore = useLessonStore()

function confirm () {
  showDialog.value = true
}

async function deleteCard (lessonId) {
  await lessonStore.deleteLesson(lessonId)
}
</script>
