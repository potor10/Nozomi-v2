// Import Modules
import express from 'express'

// Import Controllers
import profile from '../../controllers/user/get/profile.js'
import guilds from '../../controllers/user/get/guilds.js'
import stats from '../../controllers/user/get/stats.js'

const router = express.Router()

router.get('/profile', profile)
router.get('/guilds', guilds)
router.get('/stats/:server_id', stats)

export default router