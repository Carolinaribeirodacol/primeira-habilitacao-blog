<template>
  <div>
    <q-btn @click="confirm = true" flat color="negative" icon="delete" padding="xs" size="sm" />
    <q-dialog v-model="confirm" persistent>
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
import { Notify } from 'quasar'
import { useLessonStore } from 'src/stores/lessonStore'
import { ref } from 'vue'

defineOptions({ name: 'AppDeleteDialog' })

defineProps({
  lessonId: {
    type: Number,
    default: 1
  }
})

const confirm = ref(false)
const lessonStore = useLessonStore()

async function deleteCard (lessonId) {
  try {
    await lessonStore.deleteLesson(lessonId)

    Notify.create({
      type: 'positive',
      message: 'Lição deletada com sucesso!',
      position: 'top-right'
    })
  } catch {
    Notify.create({
      type: 'negative',
      message: 'Não foi possível deletar a lição!',
      position: 'top-right'
    })
  }
}

</script>
