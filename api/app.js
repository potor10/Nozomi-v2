// Dependencies
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const path = require('path')

const api_router = require('./routes/hello')
const discord_router = require('./routes/discord_router')

module.exports = class NozomiApi {
  constructor() {
    this._app = express()

    // for parsing this.application/json
    this._app.use(express.json()) 
    // for parsing this.application/x-www-form-urlencoded
    this._app.use(express.urlencoded({ extended: true })) 

    this._CORS_OPTIONS = {
      origin: 'http://localhost:3000',
      credentials: true
    }

    this._app.use(cors(this._CORS_OPTIONS))
    this.useSession()
    this.useStatic()
    this.useRouter()
  }

  useRouter() {
    this._app.use('/testAPI', api_router)
    this._app.use('/discord', discord_router)

    // 404, page can't be found
    this._app.use((req, res) => {
      res.status(404).send('404 page not found')
    })
  }

  useStatic() {
    const src_prefix = '/priconne-cdn-extract/out/en'
    const src_suffix = '/extract/latest'
    const src_dir = [ '/banner', '/icon', '/unit' ]

    src_dir.forEach(src => {
      const file_dir = path.join(__dirname, '..', src_prefix, src, src_suffix)
      const web_dir = path.join('/images', src)
      this._app.use(web_dir, express.static(file_dir))
    })
  }

  useSession() {
    this._app.set('trust proxy', 1) // trust first proxy
    
    this._app.use(session({
      secret: 'nozomi_pog',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }))

    this._app.use(function (req, res, next) {
      if (!req.session.login_status) {
        req.session.login_status = false
      }

      next()
    })
  }

  run() {
    this._app.listen(process.env.PORT, () => {
      console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    })
  }
}
