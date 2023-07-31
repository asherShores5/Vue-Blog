// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createWebHistory } from 'vue-router';
import router from './router'; // Import the router configuration
import './main.css';

const app = createApp(App);

// Set up Axios base URL
axios.defaults.baseURL = 'http://localhost:3001';

app.use(router); // Use the router
app.mount('#app');
