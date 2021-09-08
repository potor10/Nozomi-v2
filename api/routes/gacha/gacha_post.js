// Import Modules
import express from 'express'

// Import Controllers
import pullTen from '../../controllers/gacha/gacha_post/pull_ten.js'

const router = express.Router()

router.post('/pull_ten', pullTen)

export default router