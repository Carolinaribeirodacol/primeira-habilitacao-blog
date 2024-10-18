import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: []
  }),
  actions: {
    async fetchPosts() {
      const { data } = await axios.get('http://localhost:3000/posts')
      console.log('chamou', data);
      this.posts = data
    }
  }
})
