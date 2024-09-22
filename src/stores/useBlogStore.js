import { defineStore } from 'pinia'
import axios from 'axios'

import { formatDate } from '../helpers/date-helper'

const BASE_URL = 'http://127.0.0.1:5001/fireb-blog-demo-90bef/us-central1'

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
        const response = await axios.get(`${BASE_URL}/get_articles`)
        this.articles = response.data
      } catch (error) {
        this.error = error.message
        this.isError = true
      } finally {
        this.isLoading = false
        console.info('articles', this.articles)
      }
    },

    async fetchArticle(id) {
      this.startLoadingState()
      try {
        const response = await axios.get(`${BASE_URL}/get_articles?id=${id}`)
        this.currentArticle = response.data
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
        await axios.post(`${BASE_URL}/create_article`, articleData)
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
        await axios.put(`${BASE_URL}/update_article?id=${id}`, articleData)
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
        await axios.delete(`${BASE_URL}/delete_article?id=${id}`)
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
