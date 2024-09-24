const isDevelopment = process.env.NODE_ENV === 'development'

const devBaseUrl = 'http://127.0.0.1:5001/fireb-blog-demo-90bef/us-central1'
const prodUrls = {
  createArticle: 'https://create-article-pgz4ssjl2a-uc.a.run.app',
  deleteArticle: 'https://delete-article-pgz4ssjl2a-uc.a.run.app',
  getArticles: 'https://get-articles-pgz4ssjl2a-uc.a.run.app',
  updateArticle: 'https://update-article-pgz4ssjl2a-uc.a.run.app',
}

export const apiConfig = {
  getArticlesUrl: (id) =>
    isDevelopment
      ? `${devBaseUrl}/get_articles${id ? `?id=${id}` : ''}`
      : `${prodUrls.getArticles}${id ? `?id=${id}` : ''}`,

  createArticleUrl: () =>
    isDevelopment ? `${devBaseUrl}/create_article` : prodUrls.createArticle,

  updateArticleUrl: (id) =>
    isDevelopment
      ? `${devBaseUrl}/update_article?id=${id}`
      : `${prodUrls.updateArticle}?id=${id}`,

  deleteArticleUrl: (id) =>
    isDevelopment
      ? `${devBaseUrl}/delete_article?id=${id}`
      : `${prodUrls.deleteArticle}?id=${id}`,
}
