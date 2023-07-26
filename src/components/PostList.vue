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
  export default {
    name: 'PostList',
    data() {
      return {
        posts: [
          { id: 1, title: 'First Blog Post' },
          { id: 2, title: 'Second Blog Post' },
          { id: 3, title: 'Third Blog Post' },
          // Add more sample posts or replace with real data from the API
        ],
      };
    },
  };
  </script>
  