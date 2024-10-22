<template>
  <q-page padding class="lesson-page">
    <q-form class="lesson-page__form" @submit="handleSubmit">
      <q-input outlined v-model="form.title" label="Título" required />
      <q-uploader
        label="Imagem"
        accept="image/*"
        @added="handleFileUpload"
        :max-files="1"
        outlined
        class="lesson-page__uploader"
      />
      <q-select outlined v-model="form.category" :options="categories" label="Categoria" required />
      <q-editor outlined v-model="form.description" label="Descrição" />

      <div class="lesson-page__buttons">
        <q-btn label="Salvar" type="submit" color="primary" />
        <q-btn v-if="isEditMode" label="Deletar" color="negative" @click="confirmDelete" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar'
import { useLessonStore } from 'src/stores/lessonStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'LessonForm'
})

const props = defineProps({
  id: Number
})

const lessonStore = useLessonStore()
const router = useRouter()

const form = ref({
  title: '',
  image: '',
  category: '',
  description: ''
})

const categories = ref(['legislação de trânsito', 'direção defensiva', 'primeiros socorros'])

const handleFileUpload = (files) => {
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

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await lessonStore.updateLesson(props.id, form.value)
    } else {
      await lessonStore.createLesson(form.value)
    }

    Notify.create({
      type: 'positive',
      message: isEditMode.value ? 'Lição atualizada com sucesso!' : 'Lição criada com sucesso!',
      position: 'top-right'
    })

    router.push('/lessons')
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: isEditMode.value ? 'Não foi possível atualizar a lição!' : 'Não foi possível criar a lição!',
      position: 'top-right'
    })
  }
}
</script>

<style lang="scss" scoped>
  .lesson-page {
    &__form {
      width: 80%;

      .row {
        margin-bottom: 1rem;
      }
    }

    &__buttons {
        margin-top: 1rem;
      }

    &__buttons button:first-child {
      margin-right: 1rem;
    }

    &__uploader {
      margin: 1rem 0 1rem 0;
      width: 100%;
    }
  }
</style>
