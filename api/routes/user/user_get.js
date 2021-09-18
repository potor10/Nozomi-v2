// Import Modules
import express from 'express'

// Import Controllers
import profileController from '../../controllers/user/user_get/profile_controller.js'
import guildsController from '../../controllers/user/user_get/guilds_controller.js'
import statsController from '../../controllers/user/user_get/stats_controller.js'
import leaderboardController from '../../controllers/user/user_get/leaderboard_controller.js'

const router = express.Router()

router.get('/profile', profileController)
router.get('/guilds', guildsController)
router.get('/stats/:server_id', statsController)
router.get('/leaderboard/:server_id', leaderboardController)

export default router