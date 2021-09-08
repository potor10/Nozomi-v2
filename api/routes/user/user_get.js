// Import Modules
import express from 'express'

// Import Controllers
import profile from '../../controllers/user/user_get/profile.js'
import guilds from '../../controllers/user/user_get/guilds.js'
import stats from '../../controllers/user/user_get/stats.js'

const router = express.Router()

router.get('/profile', profile)
router.get('/guilds', guilds)
router.get('/stats/:server_id', stats)

export default router