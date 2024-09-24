import { defineStore } from 'pinia'
import axios from 'axios'
import { formatDate } from '../helpers/date-helper'
import { apiConfig } from '../../api-config.js'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles: [],
    currentArticle: null,
    isLoading: false,
    isError: false,
    error: null,
  }),

  actions: {
    formatDate(date) {
      return formatDate(date)
    },

    startLoadingState() {
      this.isLoading = true
      this.isError = false
      this.error = null
    },

    async fetchArticles() {
      this.startLoadingState()
      try {
        const response = await axios.get(apiConfig.getArticlesUrl())
        this.articles = response.data
      } catch (error) {
        this.error = error.message
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },

    async fetchArticle(id) {
      this.startLoadingState()
      try {
        const response = await axios.get(apiConfig.getArticlesUrl(id))
        if (response.data) {
          this.currentArticle = response.data
        } else {
          this.error = 'Article not found'
          this.isError = true
        }
      } catch (error) {
        this.error = error.message
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },

    async createArticle(articleData) {
      this.startLoadingState()
      try {
        await axios.post(apiConfig.createArticleUrl(), articleData)
        await this.fetchArticles()
      } catch (error) {
        this.error = error.message
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },

    async updateArticle(id, articleData) {
      this.startLoadingState()
      try {
        await axios.put(apiConfig.updateArticleUrl(id), articleData)
        await this.fetchArticles()
      } catch (error) {
        this.error = error.message
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },

    async deleteArticle(id) {
      this.startLoadingState()
      try {
        await axios.delete(apiConfig.deleteArticleUrl(id))
        await this.fetchArticles()
      } catch (error) {
        this.error = error.message
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
  },
})
