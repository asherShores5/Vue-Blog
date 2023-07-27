// src/main.js
import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import './main.css';

const app = createApp(App);

// Initialize a reactive object to hold the current user data and logged-in status
app.config.globalProperties.$user = reactive({ current: null, isLoggedIn: false });

app.use(router); // Use the router
app.mount('#app');
