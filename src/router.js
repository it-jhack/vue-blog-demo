import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import HomePage from './pages/HomePage.vue'
import BlogPage from './pages/BlogPage.vue'
import AboutPage from './pages/AboutPage.vue'
import BlogPost from './components/BlogPost.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage,
      },
      {
        path: 'blog',
        name: 'blog',
        component: BlogPage,
      },
      {
        path: 'blog/:postId',
        name: 'blogPost',
        component: BlogPost,
        props: true,
      },
      {
        path: 'about',
        name: 'about',
        component: AboutPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
