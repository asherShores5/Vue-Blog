// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import PostList from './components/PostList.vue';
import PostDetail from './components/PostDetail.vue';
import About from './components/About.vue';

const routes = [
  { path: '/', component: PostList },
  { path: '/post/:id', name: 'PostDetail', component: PostDetail, props: true },
  { path: '/about', name: 'About', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
