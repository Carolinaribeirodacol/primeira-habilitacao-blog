import axios from 'axios'
import { defineStore } from 'pinia'

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lessons: []
  }),

  getters: { // tipo uma computada, observa por mudanças
    getLessonById: state => id => state.lessons.find(lesson => lesson.id === id)
  },

  actions: {
    async getLessons () {
      try {
        const { data } = await axios.get('http://localhost:3000/lessons')
        this.lessons = data
      } catch (error) {
        console.error('Erro ao pegar as aulas:', error)
        throw error
      }
    },

    async createLesson (lessonData) {
      try {
        const { data } = await axios.post('http://localhost:3000/lessons', lessonData)

        this.lessons.push(data)
      } catch (error) {
        console.error('Erro ao criar a aula:', error)
        throw error
      }
    },

    async updateLesson (id, lessonData) {
      try {
        const { data } = await axios.put(`http://localhost:3000/lessons/${id}`, lessonData)
        const index = this.lessons.findIndex(lesson => lesson.id === id)

        if (~index) {
          this.lessons[index] = data
        }
      } catch (error) {
        console.error('Erro ao atualizar a aula:', error)
        throw error
      }
    },

    async deleteLesson (id) {
      try {
        await axios.delete(`http://localhost:3000/lessons/${id}`)
        this.lessons = this.lessons.filter(lesson => lesson.id !== id)
      } catch (error) {
        console.error('Erro ao excluir a aula:', error)
        throw error
      }
    }
  }
})
