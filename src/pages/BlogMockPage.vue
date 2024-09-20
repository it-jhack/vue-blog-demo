<template>
  <q-page padding>
    <div class="row items-start justify-between q-mb-md">
      <div class="col-grow">
        <h3 class="q-my-none">Blog Mock</h3>
        <h6 class="q-my-sm">Frontend only</h6>
      </div>
      <div class="col-auto" style="margin-top: 55px">
        <q-btn
          color="primary"
          label="Create New Article"
          icon="sym_o_add"
          @click="openDialog"
        />
      </div>
    </div>

    <div v-if="blogStore.blogPosts.length === 0">
      <p class="text-h5 text-center q-mt-lg">No articles yet</p>
    </div>
    <q-list v-else separator>
      <q-item
        v-for="post in blogStore.blogPosts"
        :key="post.id"
        clickable
        v-ripple
        class="blog-item"
        @click="goToPost(post.id)"
      >
        <q-item-section>
          <q-item-label class="text-h6">{{ post.title }}</q-item-label>
          <q-item-label caption>
            {{ blogStore.formatDate(post.date) }}
          </q-item-label>
          <q-item-label class="q-mt-sm">{{ post.excerpt }}</q-item-label>
        </q-item-section>
        <q-item-section side class="action-buttons">
          <q-btn flat round icon="edit" @click.stop="editPost(post)" />
          <q-btn flat round icon="delete" @click.stop="confirmDelete(post)" />
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

    <q-dialog v-model="showEditDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Edit Article</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onEditSubmit" class="q-gutter-md">
            <q-input v-model="editingPost.title" label="Title" required />
            <q-input v-model="editingPost.excerpt" label="Excerpt" required />
            <q-editor
              v-model="editingPost.content"
              min-height="5rem"
              label="Content"
              required
            />
            <div>
              <q-btn label="Update" type="submit" color="primary" />
              <q-btn label="Cancel" flat class="q-ml-sm" v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Deletion</div>
        </q-card-section>
        <q-card-section>
          Are you sure you want to delete this post?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="negative"
            @click="deletePost"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/useBlogStore'

const showDialog = ref(false)
const newPost = ref({
  title: '',
  excerpt: '',
  content: '',
})

const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingPost = ref({})
const postToDelete = ref(null)

const router = useRouter()
const blogStore = useBlogStore()

function openDialog() {
  showDialog.value = true
}

function onSubmit() {
  // IMPORTANT: When integrating with the backend, ensure all user input is sanitized
  // to prevent security vulnerabilities such as cross-site scripting (XSS) attacks.
  blogStore.createPost({
    title: newPost.value.title,
    excerpt: newPost.value.excerpt,
    content: newPost.value.content,
  })

  showDialog.value = false
  newPost.value = { title: '', excerpt: '', content: '' }
}

function editPost(post) {
  editingPost.value = { ...post }
  showEditDialog.value = true
}

function onEditSubmit() {
  // IMPORTANT: When integrating with the backend, ensure all user input is sanitized
  // to prevent security vulnerabilities such as cross-site scripting (XSS) attacks.
  blogStore.updatePost(editingPost.value)
  showEditDialog.value = false
}

function confirmDelete(post) {
  postToDelete.value = post
  showDeleteDialog.value = true
}

function deletePost() {
  if (postToDelete.value) {
    blogStore.deletePost(postToDelete.value.id)
    postToDelete.value = null
  }
}

function goToPost(postId) {
  router.push({ name: 'blogPost', params: { postId } })
}
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}

.blog-item {
  transition: all 0.3s ease;
  border: 1px solid transparent;
  position: relative;
}

.blog-item:hover {
  border-radius: 8px;
  border-color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-buttons {
  display: none;
  position: absolute;
  right: 8px;
  top: 25px;
  transform: translateY(-50%);
  flex-direction: row;
}

.blog-item:hover .action-buttons {
  display: flex;
}
</style>
