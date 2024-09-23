<template>
  <q-page class="q-pa-md">
    <div v-if="isLoading">
      <q-spinner color="primary" size="3em" />
    </div>
    <div v-else-if="isError">
      <q-banner class="bg-negative text-white">
        {{ error }}
      </q-banner>
    </div>
    <div v-else-if="currentArticle">
      <h1 class="text-h3 q-mb-md">{{ currentArticle.title }}</h1>
      <p class="text-subtitle1 q-mb-sm">By {{ currentArticle.author }}</p>
      <p class="text-caption q-mb-lg">
        {{ formatDate(currentArticle.publishedAt) }}
      </p>
      <q-separator class="q-mb-lg" />
      <div class="content q-mb-xl" v-html="currentArticle.content"></div>
    </div>
    <div v-else>
      <q-banner class="bg-warning text-white"> Article not found </q-banner>
    </div>
    <q-btn
      color="primary"
      label="Go Back"
      icon="arrow_back"
      @click="$router.go(-1)"
      class="q-mb-md"
    />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBlogStore } from '../stores/useBlogStore'

const route = useRoute()
const blogStore = useBlogStore()

const { currentArticle, isLoading, isError, error } = storeToRefs(blogStore)
const { fetchArticle, formatDate } = blogStore

onMounted(async () => {
  const postId = route.params.postId
  await fetchArticle(postId)
})
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
