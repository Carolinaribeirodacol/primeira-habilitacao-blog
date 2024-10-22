import axios from 'axios';
import { defineStore } from 'pinia';

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lessons: []
  }),

  getters: { // tipo um watch, observa por mudanças
    getLessonById: (state) => (id) => state.lessons.find(lesson => lesson.id === id),
  },

  actions: {
    async getLessons () {
      const { data } = await axios.get('http://localhost:3000/lessons')
      this.lessons = data
    },

    async createLesson (lessonData) {
      try {
        const { data } = await axios.post('http://localhost:3000/lessons', lessonData);
        this.lessons.push(data);
      } catch (error) {
        console.error('Erro ao criar a aula:', error);
        throw error;
      }
    },

    async updateLesson (id, lessonData) {
      try {
        const { data } = await axios.put(`http://localhost:3000/lessons/${id}`, lessonData);
        const index = this.lessons.findIndex(lesson => lesson.id === id);

        if (index !== -1) {
          this.lessons[index] = data;
        }
      } catch (error) {
        console.error('Erro ao atualizar a aula:', error);
        throw error;
      }
    },

    async deleteLesson (id) {
      try {
        await axios.delete(`http://localhost:3000/lessons/${id}`);
        this.lessons = this.lessons.filter(lesson => lesson.id !== id);
      } catch (error) {
        console.error('Erro ao excluir a aula:', error);
        throw error;
      }
    }
  }
})
