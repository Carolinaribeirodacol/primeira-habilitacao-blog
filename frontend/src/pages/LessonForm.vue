<template>
  <q-page padding class="page-lesson">
    <q-form class="page-lesson__form" @submit="submit">
      <q-input outlined v-model="form.title" label="Título" required />

      <q-uploader
        label="Imagem"
        accept="image/*"
        @added="uploadFile"
        :max-files="1"
        outlined
        class="page-lesson__uploader q-my-md full-width"
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

      <div class="page-lesson__buttons q-mt-md row q-col-gutter-md">
        <div>
          <q-btn label="Salvar" type="submit" color="primary" size="md" />
        </div>

        <div>
          <q-btn v-if="isEditMode" label="Deletar" color="negative" size="md" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useLessonStore } from 'src/stores/lessonStore'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'LessonForm' })

const lessonStore = useLessonStore()
const router = useRouter()
const route = useRoute()

const form = ref({
  title: '',
  image: '',
  category: '',
  description: ''
})

const categories = ['legislação de trânsito', 'direção defensiva', 'primeiros socorros']
const { id } = route.params
const isEditMode = computed(() => !!id)

const lessonForm = computed(() => {
  if (isEditMode.value) {
    const lesson = lessonStore.getLessonById(id)
    return lesson ? { ...lesson } : {}
  }
  return form
})

watch(lessonForm, (newVal) => {
  if (isEditMode.value) {
    form.value = { ...newVal }
  }
}, { immediate: true })

function uploadFile (files) {
  const file = files[0]

  // nativo do javascript -> lê o conteúdo do arquivo para salvar como url
  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onload = () => {
    form.value.image = reader.result
  }
}

async function submit () {
  isEditMode.value
    ? await lessonStore.updateLesson(id, form.value)
    : await lessonStore.createLesson(form.value)

  router.push({ name: 'LessonList' })
}
</script>

<style lang="scss">
.page-lesson {
  &__form {
    width: 80%;
  }
}
</style>
