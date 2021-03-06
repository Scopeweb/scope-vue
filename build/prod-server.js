const express = require('express')
const compression = require('compression')
const path = require('path')
const blog = require('./blog/serve')
const feed = require('./blog/feed')

const app = express()
const port = process.env.PORT || 8000

app.use(compression())
app.use('/static', express.static(path.join(__dirname, '../dist', '/satic')))

app.get('/api/blog/:lang/:slug?', ...blog('production'))
app.get('/:lang/feed/:format', ...feed('production'))

app/get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') })
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`) // eslint-disable-line no-console
})
