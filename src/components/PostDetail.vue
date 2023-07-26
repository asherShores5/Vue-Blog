<!-- src/components/PostDetail.vue -->
<template>
    <div class="container mt-4">
      <div v-if="post">
        <h2>{{ post.title }}</h2>
        <div v-html="convertToHtml(post.content)"></div>
        <router-link to="/">Home</router-link>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import axios from 'axios'; // Import Axios

export default {
  name: 'PostDetail',
  props: ['id'],
  data() {
    return {
      post: null,
    };
  },
  async created() {
    this.post = await this.fetchPost(this.id);
  },
  methods: {
    async fetchPost(id) {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`); // Replace the URL with your JSON server endpoint
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    convertToHtml(markdownContent) {
      const md = new MarkdownIt();
      return md.render(markdownContent);
    },
  },
};
</script>
