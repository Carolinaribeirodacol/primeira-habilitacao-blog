import axios from 'axios'
import { defineStore } from 'pinia'
import { Notify } from 'quasar'

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
        Notify.create({
          type: 'negative',
          message: `Não foi possível carregar as lições! Erro: ${error}`,
          position: 'top-right'
        })
      }
    },

    async createLesson (lessonData) {
      try {
        const { data } = await axios.post('http://localhost:3000/lessons', lessonData)

        this.lessons.push(data)

        Notify.create({
          type: 'positive',
          message: 'Lição criada com sucesso!',
          position: 'top-right'
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: `Não foi possível criar a lição! Erro: ${error}`,
          position: 'top-right'
        })
      }
    },

    async updateLesson (id, lessonData) {
      try {
        const { data } = await axios.put(`http://localhost:3000/lessons/${id}`, lessonData)
        const index = this.lessons.findIndex(lesson => lesson.id === id)

        if (~index) {
          this.lessons[index] = data
        }

        Notify.create({
          type: 'positive',
          message: 'Lição atualizada com sucesso!',
          position: 'top-right'
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: `Não foi possível atualizar a lição! Erro: ${error}`,
          position: 'top-right'
        })
      }
    },

    async deleteLesson (id) {
      try {
        await axios.delete(`http://localhost:3000/lessons/${id}`)
        this.lessons = this.lessons.filter(lesson => lesson.id !== id)

        Notify.create({
          type: 'positive',
          message: 'Lição deletada com sucesso!',
          position: 'top-right'
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: `Não foi possível deletar a lição! Erro: ${error}`,
          position: 'top-right'
        })
      }
    }
  }
})
