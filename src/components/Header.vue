<!-- src/components/Header.vue -->
<template>
    <header class="blog-header">
      <h1>Vue Blog</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/FAQ">FAQ</router-link>
        <router-link to="/search">Search</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style>
  /* Add some styling for the header */
  .blog-header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
  }
  
  .blog-header h1 {
    margin: 0;
  }
  
  .blog-header nav {
    margin-top: 1rem;
  }
  
  .blog-header nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;
  }
  
  .blog-header nav a:hover {
    text-decoration: underline;
  }
  </style>
  