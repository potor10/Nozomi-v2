// Import Modules 
import express from 'express'
import session from 'express-session'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import path from 'path'

// Import Constants
import { ROUTE_PREFIX, PRICONNE_CDN_PREFIX, PRICONNE_CDN_SUFFIX, PRICONNE_CDN_DIRS } from './constants.js'

// Import Routes
import equipment_post from './routes/character/equipment/post.js'
import skills_post from './routes/character/skills/post.js'
import character_get from './routes/character/get.js'
import character_post from './routes/character/post.js'
import characters_get from './routes/characters/get.js'
import gacha_get from './routes/gacha/get.js'
import gacha_post from './routes/gacha/post.js'
import user_get from './routes/user/get.js'
import user_post from './routes/user/post.js'

class NozomiApi {
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
    this.useLimiter()
    this.useStatic()
    this.useRouter()
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
      if (!req.session.login_status) req.session.login_status = false
      if (!req.session.mutual_servers) req.session.mutual_servers = {}
      if (!req.session.user_data) req.session.user_data = {}
      if (!req.session.oauth) req.session.oauth = {}
      next()
    })
  }

  useLimiter() {
    const api_limiter = rateLimit({
      windowMs: 1000, // 15 minutes
      max: 50
    });
    // this._app.use("/api/", api_limiter);
  }

  useStatic() {
    PRICONNE_CDN_DIRS.forEach(src => {
      const file_dir = path.join(path.resolve(), PRICONNE_CDN_PREFIX, src, PRICONNE_CDN_SUFFIX)
      const web_dir = path.join('/images', src)
      this._app.use(web_dir, express.static(file_dir))
    })
  }

  useRouter() {
    // Character Routes
    this._app.use(ROUTE_PREFIX+'character/equipment', equipment_post)
    this._app.use(ROUTE_PREFIX+'character/skills', skills_post)
    this._app.use(ROUTE_PREFIX+'character', character_get)
    this._app.use(ROUTE_PREFIX+'character', character_post)
    
    // Characters Route
    this._app.use(ROUTE_PREFIX+'characters', characters_get)

    // Gacha Routes
    this._app.use(ROUTE_PREFIX+'gacha', gacha_get)
    this._app.use(ROUTE_PREFIX+'gacha', gacha_post)

    // User Routes
    this._app.use(ROUTE_PREFIX+'user', user_get)
    this._app.use(ROUTE_PREFIX+'user', user_post)

    // 404, page can't be found
    this._app.use((req, res) => { res.status(404).send('404 page not found') })
  }

  run() {
    this._app.listen(process.env.PORT, () => {
      console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    })
  }
}

export default NozomiApi