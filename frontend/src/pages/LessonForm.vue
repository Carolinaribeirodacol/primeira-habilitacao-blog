<template>
  <q-page padding class="lesson-page">
    <q-form class="lesson-page__form" @submit="submit">
      <q-input outlined v-model="form.title" label="Título" required />

      <q-uploader
        label="Imagem"
        accept="image/*"
        @added="uploadFile"
        :max-files="1"
        outlined
        class="lesson-page__uploader q-my-md full-width"
      />

      <q-select
        outlined
        v-model="form.category"
        :options="categories"
        label="Categoria"
        required
        class="q-my-md"
      />

      <q-editor outlined v-model="form.description" label="Descrição" />

      <div class="lesson-page__buttons q-mt-md">
        <q-btn label="Salvar" type="submit" color="primary" size=md />

        <q-btn v-if="isEditMode" label="Deletar" color="negative" @click="confirmDelete" size=md />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar'
import { useLessonStore } from 'src/stores/lessonStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'LessonForm' })

const props = defineProps({
  id: {
    type: Number,
    default: 1
  }
})

const lessonStore = useLessonStore()
const router = useRouter()

const form = ref({
  title: '',
  image: '',
  category: '',
  description: ''
})

const categories = (['legislação de trânsito', 'direção defensiva', 'primeiros socorros'])

function uploadFile (files) {
  const file = files[0]

  // nativo do javascript -> lê o conteúdo do arquivo para salvar como url
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    form.value.image = reader.result
  }
}

const isEditMode = computed(() => !!props.id)

if (isEditMode.value) {
  const lesson = lessonStore.getLessonById(props.id)
  if (lesson) {
    form.value = { ...lesson }
  }
}

async function submit () {
  try {
    isEditMode.value
      ? await lessonStore.updateLesson(props.id, form.value)
      : await lessonStore.createLesson(form.value)

    Notify.create({
      type: 'positive',
      message: isEditMode.value ? 'Lição atualizada com sucesso!' : 'Lição criada com sucesso!',
      position: 'top-right'
    })

    router.push({ name: 'LessonsList' })
  } catch {
    Notify.create({
      type: 'negative',
      message: isEditMode.value ? 'Não foi possível atualizar a lição!' : 'Não foi possível criar a lição!',
      position: 'top-right'
    })
  }
}
</script>

<style lang="scss">
.lesson-page {
  &__form {
    width: 80%;
  }

  &__buttons button:first-child {
    margin-right: 1rem;
  }
}
</style>
