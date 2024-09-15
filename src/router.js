import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import HomePage from './pages/HomePage.vue'
import BlogPage from './pages/BlogPage.vue'
import AboutPage from './pages/AboutPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: HomePage },
      { path: 'blog', name: 'Blog', component: BlogPage },
      { path: 'about', name: 'About', component: AboutPage },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
