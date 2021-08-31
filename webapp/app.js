// Dependencies
const express = require('express')
const path = require('path')

module.exports = class NozomiWebapp {
  constructor() {
    this._app = express()

    this._app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    const src_prefix = '/priconne-cdn-extract/out/en'
    const src_suffix = '/extract/latest'
    const src_dir = [ '/banner', '/icon', '/unit' ]

    src_dir.forEach(src => {
      const file_dir = path.join(__dirname, '..', src_prefix, src, src_suffix)
      const web_dir = path.join('/images', src)
      this._app.use(web_dir, express.static(file_dir))
    })
  }

  run() {
    const port = 3000
    this.server = this._app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }
}
