export function formatDate(date, locale = 'en-US') {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(locale, options)
}
