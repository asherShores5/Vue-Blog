// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import PostList from './components/PostList.vue';
import PostDetail from './components/PostDetail.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import FAQ from './components/FAQ.vue';
import Search from './components/search.vue';

const routes = [
  { path: '/', component: PostList },
  { path: '/post/:id', name: 'PostDetail', component: PostDetail, props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/FAQ', name: 'FAQ', component: FAQ },
  { path: '/search', name: 'Search', component: Search },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
