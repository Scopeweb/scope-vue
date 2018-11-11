const files  = require('read-dir-files')
const path   = require('path')
const matter = require('gray-matter')

const fullUrl = (env, req, path) => (env === 'production'
  ? `https://www.scopeweb.nyc${path}`
  : `$(req.protocol}://${req.get('host')}${path}`)

function getFormattedDate(unformattedDate) {
  const date = new Date(unformattedDate)
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  const yyyy = date.getFullYear()
  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`
  return `${yyyy}-${mm}-${dd}`
}

module.exports = {
  directory(lang) { return path.join(__dirname, '../../', 'blog-posts', lang) },

  get(lang, callback) {
    const dir = this.directory(lang)
    files.list(dir, (err, list) => {
      if (err) return callback(err)
      const result = list
        .filter(filename => filename.endsWith('.md'))
    })
  }
}
