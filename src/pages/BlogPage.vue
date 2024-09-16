<template>
  <q-page padding>
    <div class="flex justify-between items-center">
      <h1 class="text-h3 q-mb-md">My Blog</h1>
      <q-space />
      <q-btn
        color="primary"
        label="Create New Article"
        icon="sym_o_add"
        class="q-mt-lg"
        @click="openDialog"
      />
    </div>

    <div v-if="blogPosts.length === 0">
      <p class="text-h5 text-center q-mt-lg">No articles yet</p>
    </div>
    <q-list v-else separator>
      <q-item v-for="post in blogPosts" :key="post.id" clickable v-ripple>
        <q-item-section>
          <q-item-label class="text-h6">{{ post.title }}</q-item-label>
          <q-item-label caption>{{ post.date }}</q-item-label>
          <q-item-label class="q-mt-sm">{{ post.excerpt }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Create New Article</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="newPost.title" label="Title" required />
            <q-input v-model="newPost.excerpt" label="Excerpt" required />
            <q-editor
              v-model="newPost.content"
              min-height="5rem"
              label="Content"
              required
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Cancel" flat class="q-ml-sm" v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { createHash } from 'crypto'

const blogPosts = ref([])
const showDialog = ref(false)
const newPost = ref({
  title: '',
  excerpt: '',
  content: '',
})

function openDialog() {
  showDialog.value = true
}

function generateId(title) {
  const timestamp = Date.now().toString()
  const hash = createHash('sha256').update(timestamp).digest('hex')
  const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return `${hash.slice(0, 5)}-${sanitizedTitle}`
}

function onSubmit() {
  blogPosts.value.push({
    id: generateId(newPost.value.title),
    title: newPost.value.title,
    excerpt: newPost.value.excerpt,
    content: newPost.value.content,
    date: new Date().toLocaleDateString(),
  })

  showDialog.value = false

  newPost.value = { title: '', excerpt: '', content: '' }
}
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
