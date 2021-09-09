// Import Modules
import express from 'express'

// Import Controllers
import loginController from '../../controllers/user/user_post/login_controller.js'
import logoutController from '../../controllers/user/user_post/logout_controller.js'
import dailyController from '../../controllers/user/user_post/daily_controller.js'

const router = express.Router()

router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/daily', dailyController)

export default router