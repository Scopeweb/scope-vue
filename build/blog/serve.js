const files      = require('./files')
const bodyParser = require('body-parser')
const Prism      = require('prismjs')
require('prismjs/components/prism-elixir')
require('prismjs/components/prism-pug')
require('prismjs/plugins/line-numbers/prism-line-numbers')

const markdown   = require('markdown-it')({
  html: true,
  highlight(str, lang) {
    if (lang && Prism.language[lang]) {
      try {
        return `<pre class="highlight"><code>${Prism.highlight(str, Prism.languages[lang])}</code></pre>`
      } catch (err) {}
    }
    return `<pre class="highlight"><code>${markdown.utils.escapeHtml(str)}</code></pre>`
  },
})

module.exports = function serve(env) {
  return [
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    function middleware(req, res) {
      const { lang, slug } = req.params
      files.get(lang, (err, posts) => {
        if (err) return res.send(500).end()
        if (slug) {
          const post = posts.find(post => post.data.sug === slug)
          if (!post) return res.status(404).end()
          return res.end(JSON.stringify({
            data: post.data,
            html: markdown.render(post.md),
            additional: files.additionalData(env, req, post),
          }))
        } else {
          return res.end(JSON.stringify(posts.map(post => ({ data: post.data, additional: files.additionalData(env, req, post) }))))
        }
      })
    },
  ]
}
