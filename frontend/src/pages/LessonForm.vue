<template>
  <q-page class="lesson-page">
    <q-form class="lesson-page__form" @submit="handleSubmit">
      <q-input outlined v-model="form.title" label="Título" required />
      <q-input outlined v-model="form.image" label="Imagem" />
      <q-select outlined v-model="form.category" :options="categories" label="Categoria" required />
      <q-editor outlined v-model="form.description" label="Descrição" />

      <div class="lesson-page__form__buttons">
        <q-btn label="Salvar" type="submit" color="primary" />
        <q-btn v-if="isEditMode" label="Deletar" color="negative" @click="confirmDelete" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useLessonStore } from 'src/stores/lessonStore';
import { computed, ref } from 'vue';

  defineOptions({
    name: 'LessonForm'
  });

  const props = defineProps({
    id: Number
  })

  const lessonStore = useLessonStore();

  const form = ref({
    title: '',
    image: '',
    category: '',
    description: ''
  });

  const categories = ref(['legislação de trânsito', 'direção defensiva', 'primeiros socorros']);

  const isEditMode = computed(() => !!props.id);

  if (isEditMode.value) {
    const lesson = lessonStore.getLessonById(props.id);
    if (lesson) {
      form.value = { ...lesson };
    }
  }

  const handleSubmit = () => {
    if (isEditMode.value) {
      lessonStore.updateLesson(props.id, form.value);
    } else {
      lessonStore.createLesson(form.value);
    }
  };
</script>

<style lang="scss" scoped>
  .lesson-page {
    padding: 1rem;

    &__form {
      width: 80%;

      .row {
        margin-bottom: 1rem;
      }

      &__buttons {
        margin-top: 1rem;
      }

      &__buttons button:first-child {
        margin-right: 1rem;
      }
    }
  }
</style>
