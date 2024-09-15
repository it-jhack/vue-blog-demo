<template>
  <q-page padding>
    <div class="content-container">
      <h1 class="text-h2 q-mb-md text-center">About the tech stack</h1>
      <p class="text-h5 text-center q-mb-xl">
        Learn about the technologies powering this blog
      </p>

      <q-list
        class="q-mt-md"
        style="width: 100%; max-width: 600px; margin: 0 auto"
      >
        <q-item v-for="tech in techStack" :key="tech.name">
          <q-item-section avatar>
            <q-icon :name="tech.icon" color="primary" size="md" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ tech.name }}</q-item-label>
            <q-item-label caption>{{ tech.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const techStack = ref([
  {
    name: 'Vue 3',
    icon: 'mdi-vuejs',
    description:
      'Progressive JavaScript framework for building user interfaces',
  },
  {
    name: 'Quasar Framework',
    icon: 'mdi-atom-variant',
    description:
      'Vue.js based framework for building responsive web applications',
  },
  {
    name: 'Vue Router',
    icon: 'mdi-routes',
    description: 'Official router for Vue.js applications',
  },
  {
    name: 'Composition API',
    icon: 'mdi-function',
    description:
      'A set of additive, function-based APIs for flexible component logic composition',
  },
])
</script>

<style scoped>
.content-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.text-center {
  text-align: center;
}
</style>
