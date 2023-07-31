<!-- ~/src/components/Header.vue  NavBar -->
<template>
  <header class="blog-header">
    <h1>A Vue into Web Design</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/blog">Blog</router-link>      
      <router-link to="/create">Create</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/FAQ">FAQ</router-link>
      <router-link to="/search">Search</router-link>

      <!-- Conditional display of welcome button or login link -->
      <template v-if="isLoggedIn && user">
        <button type="button" class="btn btn-secondary" @click="goToAccountPage">
          Welcome {{ user.name }}
        </button>
      </template>

      <!-- Display the Login link when the user is not logged in -->
      <template v-else>
        <router-link to="/login">Login</router-link>
      </template>
    </nav>
  </header>
</template>


<script>
import axios from 'axios'; // Import Axios

export default {
  name: 'Header',
  props: ['user', 'isLoggedIn'],
  methods: {
    // Method to handle navigation to the account page
    goToAccountPage() {
      // Replace '/account' with the actual path to the user's account page
      this.$router.push('/account');
    },
    async fetchUserData() {
      try {
        // Make a GET request to the server to fetch user data
        const response = await axios.get('http://localhost:3001/users', {
          headers: {
            Authorization: localStorage.getItem('token'), // Send the JWT token in the request header
          },
        });

        // Update the isLoggedIn and user data based on the response
        this.isLoggedIn = true;
        this.user = response.data;
      } catch (error) {
        // If the request fails (e.g., due to invalid or expired token), reset the authentication state
        this.isLoggedIn = false;
        this.user = null;
        console.error('Fetch User Data Error:', error);
      }
    },
  },
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
