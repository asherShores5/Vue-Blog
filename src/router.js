// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Install the 'jwt-decode' package
import Home from './views/Home.vue';
import PostList from './components/PostList.vue';
import PostDetail from './components/PostDetail.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import FAQ from './views/FAQ.vue';
import Search from './views/Search.vue';
import Create from './views/Create.vue';
import Login from './views/Login.vue';
import Account from './views/Account.vue';
import Profile from './views/Profile.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'Blog', component: PostList },
  { path: '/PostDetail', component: PostDetail },
  { path: '/post/:id', name: 'PostDetail', component: PostDetail, props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/FAQ', name: 'FAQ', component: FAQ },
  { path: '/search', name: 'Search', component: Search },
  { path: '/create', name: 'Create', component: Create },
  { path: '/login', name: 'Login', component: Login },
  { path: '/account', name: 'Account', component: Account },
  { path: '/profile', name: 'Profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Axios interceptor to include JWT in every API request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      console.error('Token expired or unauthorized:', error.response.data.error);
      // Redirect the user to the login page or perform other actions
    }
    return Promise.reject(error);
  }
);

export default router; // Export the 'router' object directly, without using the 'default' keyword.
