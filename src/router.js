// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import PostList from './components/PostList.vue';
import PostDetail from './components/PostDetail.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import FAQ from './views/FAQ.vue';
import Search from './views/search.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'Blog', component: PostList },
  { path: '/PostDetail', component: PostDetail },
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
