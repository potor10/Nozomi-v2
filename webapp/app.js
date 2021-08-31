const express = require('express')

module.exports = class NozomiWebapp {
  constructor() {
    this.app = express()

    this.app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    const srcPrefix = '/priconne-cdn-extract/out/en'
    const srcSuffix = '/extract/latest'
    const srcDir = [ '/banner', '/icon', '/unit' ]

    srcDir.forEach(src => {
      const fileDir = __dirname + '/..' + srcPrefix + src + srcSuffix
      const webDir = '/images' + src
      this.app.use(webDir, express.static(fileDir))
    })
  }

  run() {
    const port = 3000
    this.server = this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }
}
