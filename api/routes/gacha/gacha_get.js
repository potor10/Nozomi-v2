// Import Modules
import express from 'express'

// Import Controllers
import bannerController from '../../controllers/gacha/gacha_get/banner_controller.js'

const router = express.Router()

router.get('/banner/:server_id', bannerController)

export default router