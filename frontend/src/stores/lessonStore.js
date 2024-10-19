import axios from 'axios';
import { defineStore } from 'pinia';

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lessons: []
  }),
  actions: {
    async fetchLessons() {
      const { data } = await axios.get('http://localhost:3000/lessons')
      // console.log('chamou', data);
      this.lessons = data
    }
  }
})
