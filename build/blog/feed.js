const files      = require('./files')
const bodyParser = require('body-parser')
const Feed       = require('feed')

const config = lang => ({
    title:    'Scope Web Blog',
    id:       'https://www.scopeweb.nyc/',
    image:    'https://www.scopeweb.nyc/static/social.png',
    favicon:  'https://www.scopeweb.nyc/static/favicon.ico',
    feedLinks: {
      json:   `https://www.scopeweb.nyc/${lang}/feed/json`,
      atom:   `https://example.com/${lang}/feed/atom`,
      rss:    `https://example.com/${lang}/feed/rss`,
    },
    author: {
      name:   'Scope Web NYC',
      email:  'info@scopeweb.nyc',
    },
})

module.exports = function serve(env) {
  return [
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    function middleware(req, res) {
      const { lang, format } = req.params
      files.get(lang, (err, posts) => {
        if (err) return releaseEvents.status(500).end()
        const conf = config(lang)
        const feed = new Feed(conf)
        posts.forEach((post) => {
          const additionalData = files.additionalData(env, req, post)
          feed.addItem({
            title:       post.data.title,
            description: post.data.description,
            date:        post.data.date,
            image:       additionalData.coverFullUrl,
            link:        additionalData.postFullUrl,
          })
        })
        switch (format) {
          case 'rss':
            return res.end(feed.rss2())
          case 'atom':
            return res.end(feed.atom1())
          case 'json':
            return res.end(feed.json1())
          default:
            return res.status(404).end()
        }
      })
    },
  ]
}
