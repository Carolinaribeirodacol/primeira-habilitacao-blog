import axios from 'axios';
import { defineStore } from 'pinia';

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lessons: []
  }),

  getters: {
    getLessonById: (state) => (id) => state.lessons.find(lesson => lesson.id === id),
  },

  actions: {
    async fetchLessons() {
      const { data } = await axios.get('http://localhost:3000/lessons')
      // console.log('chamou', data);
      this.lessons = data
    },

    async fetchLessonById(id) {
      try {
        const { data } = await axios.get(`http://localhost:3000/lessons/${id}`);
        return data;
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    },

    async createLesson(lessonData) {
      try {
        const { data } = await axios.post('http://localhost:3000/lessons', lessonData);
        this.lessons.push(data);
      } catch (error) {
        console.error('Error creating lesson:', error);
      }
    },

    async updateLesson(id, lessonData) {
      try {
        const { data } = await axios.put(`http://localhost:3000/lessons/${id}`, lessonData);
        const index = this.lessons.findIndex(lesson => lesson.id === id);
        if (index !== -1) {
          this.lessons[index] = data;
        }
      } catch (error) {
        console.error('Error updating lesson:', error);
      }
    },

    async deleteLesson(id) {
      try {
        await axios.delete(`http://localhost:3000/lessons/${id}`);
        this.lessons = this.lessons.filter(lesson => lesson.id !== id);
      } catch (error) {
        console.error('Error deleting lesson:', error);
      }
    }
  }
})
