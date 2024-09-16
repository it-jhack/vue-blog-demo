import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const blogPosts = ref([])

  function generateId(title) {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 7)
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return `${timestamp}-${randomStr}-${sanitizedTitle}`
  }

  function createPost(post) {
    blogPosts.value.push({
      id: generateId(post.title),
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: new Date().toISOString(),
    })
  }

  function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return {
    blogPosts,
    createPost,
    formatDate,
  }
})
