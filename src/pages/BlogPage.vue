<template>
  <q-page padding>
    <div class="row items-start justify-between q-mb-md">
      <div class="col-grow">
        <h3 class="q-my-none">Blog</h3>
        <h6 class="q-my-sm">Fullstack Integration</h6>
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

    <div v-if="isLoadingArticles" class="row justify-center q-mt-xl">
      <q-spinner color="primary" size="3em" :thickness="2" />
    </div>
    <div v-else-if="isEmptyArticles">
      <p class="text-h5 text-center q-mt-lg">No articles yet</p>
    </div>
    <div v-else-if="isErrorArticles">
      <p class="text-h5 text-center q-mt-lg">Some error occurred :/</p>
    </div>
    <q-list v-else separator>
      <q-item
        v-for="post in articles"
        :key="post.id"
        clickable
        v-ripple
        class="blog-item q-py-lg"
        @click="goToPost(post.id)"
      >
        <q-item-section>
          <q-item-label class="text-h6 q-mt-md">{{ post.title }}</q-item-label>
          <q-item-label caption class="q-py-sm">
            {{ formatDate(post.publishedAt) }} | By {{ post.author }}
          </q-item-label>
          <q-item-label class="q-mb-md">{{ post.excerpt }}</q-item-label>
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
            <q-input v-model="newPost.author" label="Author" required />
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
            <q-input v-model="editingPost.author" label="Author" required />
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
            @click="deleteArticleHandler"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/useBlogStore'
import { storeToRefs } from 'pinia'

const showDialog = ref(false)
const newPost = ref({
  title: '',
  author: '',
  excerpt: '',
  content: '',
})

const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingPost = ref({})
const postToDelete = ref(null)

const router = useRouter()
const blogStore = useBlogStore()

onMounted(() => {
  fetchArticles()
})

const { articles, isLoadingArticles, isEmptyArticles, isErrorArticles } =
  storeToRefs(blogStore)

const {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  formatDate,
} = blogStore

function openDialog() {
  showDialog.value = true
}

function onSubmit() {
  createArticle({
    title: newPost.value.title,
    author: newPost.value.author,
    excerpt: newPost.value.excerpt,
    content: newPost.value.content,
  })

  showDialog.value = false
  newPost.value = { title: '', author: '', excerpt: '', content: '' }
}

function editPost(post) {
  editingPost.value = { ...post }
  showEditDialog.value = true
}

function onEditSubmit() {
  updateArticle(editingPost.value.id, editingPost.value)
  showEditDialog.value = false
}

function confirmDelete(post) {
  postToDelete.value = post
  showDeleteDialog.value = true
}

function deleteArticleHandler() {
  if (postToDelete.value) {
    deleteArticle(postToDelete.value.id)
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
