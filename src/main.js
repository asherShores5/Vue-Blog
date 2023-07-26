// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import './main.css';

const app = createApp(App);
app.use(router); // Use the router
app.mount('#app');
