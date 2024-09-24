import { defineStore } from 'pinia'
import axios from 'axios'
import { formatDate } from '../helpers/date-helper'
import { apiConfig } from '../../api-config.js'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles: [],
    currentArticle: null,
    isLoadingArticles: false,
    isEmptyArticles: false,
    isErrorArticles: false,
    errorMessage: null,
  }),

  actions: {
    formatDate(date) {
      return formatDate(date)
    },

    startLoadingState() {
      this.isLoadingArticles = true
      this.isEmptyArticles = false
      this.isErrorArticles = false
      this.errorMessage = null
    },

    async fetchArticles() {
      this.startLoadingState()
      try {
        const response = await axios.get(apiConfig.getArticlesUrl())
        this.articles = response.data
        this.isEmptyArticles = this.articles.length === 0
      } catch (error) {
        this.errorMessage = error.message
        this.isErrorArticles = true
      } finally {
        this.isLoadingArticles = false
      }
    },

    async fetchArticle(id) {
      this.startLoadingState()
      try {
        const response = await axios.get(apiConfig.getArticlesUrl(id))
        if (response.data) {
          this.currentArticle = response.data
        } else {
          this.errorMessage = 'Article not found'
          this.isErrorArticles = true
        }
      } catch (error) {
        this.errorMessage = error.message
        this.isErrorArticles = true
      } finally {
        this.isLoadingArticles = false
      }
    },

    async createArticle(articleData) {
      this.startLoadingState()
      try {
        await axios.post(apiConfig.createArticleUrl(), articleData)
        await this.fetchArticles()
      } catch (error) {
        this.errorMessage = error.message
        this.isErrorArticles = true
      } finally {
        this.isLoadingArticles = false
      }
    },

    async updateArticle(id, articleData) {
      this.startLoadingState()
      try {
        await axios.put(apiConfig.updateArticleUrl(id), articleData)
        await this.fetchArticles()
      } catch (error) {
        this.errorMessage = error.message
        this.isErrorArticles = true
      } finally {
        this.isLoadingArticles = false
      }
    },

    async deleteArticle(id) {
      this.startLoadingState()
      try {
        await axios.delete(apiConfig.deleteArticleUrl(id))
        await this.fetchArticles()
      } catch (error) {
        this.errorMessage = error.message
        this.isErrorArticles = true
      } finally {
        this.isLoadingArticles = false
      }
    },
  },
})
