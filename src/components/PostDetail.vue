<!-- src/components/PostDetail.vue -->
<template>
    <div class="container mt-4">
      <div v-if="post">
        <h2>{{ post.title }}</h2>
        <div v-html="convertToHtml(post.content)"></div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import MarkdownIt from 'markdown-it';
  
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
        // Replace this with your API call or real data retrieval logic
        const response = await fetch(`https://api.example.com/posts/${id}`);
        const data = await response.json();
        return data;
      },
      convertToHtml(markdownContent) {
        const md = new MarkdownIt();
        return md.render(markdownContent);
      },
    },
  };
  </script>
  