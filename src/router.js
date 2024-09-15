import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import BlogPage from './pages/BlogPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: 'blog', name: 'Blog', component: BlogPage }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
