<template>
  <q-page padding>
    <h1 class="text-h3 q-mb-md">My Blog</h1>

    <q-list bordered separator>
      <q-item v-for="post in blogPosts" :key="post.id" clickable v-ripple>
        <q-item-section>
          <q-item-label class="text-h6">{{ post.title }}</q-item-label>
          <q-item-label caption>{{ post.date }}</q-item-label>
          <q-item-label class="q-mt-sm">{{ post.excerpt }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const blogPosts = ref([
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    date: 'May 15, 2023',
    excerpt:
      'Learn the basics of Vue 3 and how to create your first application.',
  },
  {
    id: 2,
    title: 'Mastering Quasar Framework',
    date: 'May 20, 2023',
    excerpt:
      'Dive deep into Quasar Framework and discover its powerful features.',
  },
  {
    id: 3,
    title: 'Building Responsive Layouts',
    date: 'May 25, 2023',
    excerpt:
      'Tips and tricks for creating responsive layouts using Quasar components.',
  },
])
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
