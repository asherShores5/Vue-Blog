<!-- src/App.vue -->
<template>
  <div class="site-wrapper">
    <!-- Header -->
    <Header :isLoggedIn="isLoggedIn" :user="user" />

    <!-- Main Content -->
    <main class="site-content">
      <router-view :user="user" :isLoggedIn="isLoggedIn" />
    </main>

    <!-- Footer -->
    <footer class="blog-footer">
      &copy; 2023 Your Vue Blog
    </footer>
  </div>
</template>



<script>
import Header from './components/Header.vue';
import Login from './views/Login.vue';

export default {
  name: 'App',
  components: {
    Header,
    Login
  },
  data() {
    return {
      isLoggedIn: false,
      user: null
    }
  },
  methods: {
    handleLogin(userData) {
      this.isLoggedIn = true;
      this.user = userData;
    }
  },
};
</script>
  
  <style>
  /* Add some basic styles for the main content and footer */
  .site-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .site-content {
    flex: 1;
    /* Add additional styling as needed */
  }
  
  .blog-footer {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
  }
  </style>
  