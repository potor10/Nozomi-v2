// Import Modules
import express from 'express'

// Import Controllers
import pullTenController from '../../controllers/gacha/gacha_post/pull_ten_controller.js'
import pullController from '../../controllers/gacha/gacha_post/pull_controller.js'

const router = express.Router()

router.post('/pull_ten', pullTenController)
router.post('/pull', pullController)

export default router