<template>
  <q-page padding>
    <div v-if="post">
      <h1 class="text-h3 q-mb-md">{{ post.title }}</h1>
      <p class="text-subtitle1 q-mb-lg">
        {{ blogMockStore.formatDate(post.date) }}
      </p>
      <div v-html="post.content"></div>
    </div>
    <div v-else>
      <p class="text-h5 text-center">Post not found</p>
    </div>
    <q-btn
      color="primary"
      label="Back to Blog"
      icon="arrow_back"
      class="q-mt-lg"
      @click="goBack"
    />
  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogMockStore } from '../stores/useBlogMockStore'

const route = useRoute()
const router = useRouter()
const blogMockStore = useBlogMockStore()

const post = computed(() =>
  blogMockStore.blogPosts.find((p) => p.id === route.params.postId)
)

onMounted(() => {
  if (!post.value) {
    router.push({ name: 'blogMock' })
  }
})

function goBack() {
  router.push({ name: 'blogMock' })
}
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
