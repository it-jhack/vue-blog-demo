import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import HomePage from './pages/HomePage.vue'
import BlogMockPage from './pages/BlogMockPage.vue'
import BlogPostMock from './components/BlogPostMock.vue'
import BlogPage from './pages/BlogPage.vue'
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
        path: 'blog-mock',
        name: 'blogMock',
        component: BlogMockPage,
      },
      {
        path: 'blog-mock/:postId',
        name: 'blogPostMock',
        component: BlogPostMock,
        props: true,
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
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
