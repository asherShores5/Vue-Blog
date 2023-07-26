<!-- src/components/PostList.vue -->
<template>
    <div class="container mt-4">
      <h2>Blog Posts</h2>
      <ul class="list-group">
        <li v-for="post in posts" :key="post.id" class="list-group-item">
          <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
            {{ post.title }}
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios'; // Import Axios

export default {
  name: 'PostList',
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    this.posts = await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3001/posts'); // Replace the URL with your JSON server endpoint
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
};
</script>
