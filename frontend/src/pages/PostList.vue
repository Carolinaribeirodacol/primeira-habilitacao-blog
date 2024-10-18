<template>
  <div>
    <h1>Listagem dos posts</h1>

    <div v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from 'src/stores/postStore'
import { onMounted, computed } from 'vue'

const postStore = usePostStore()
const posts = computed(() => postStore.posts)

onMounted(() => {
  postStore.fetchPosts()
})

defineOptions({
  name: 'PostList'
});
</script>
