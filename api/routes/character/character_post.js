// Import Modules
import express from 'express'

// Import Controllers
import levelController from '../../controllers/character/character_post/level_controller.js'
import ascendController from '../../controllers/character/character_post/ascend_controller.js'
import rankUpController from '../../controllers/character/character_post/rank_up_controller.js'

const router = express.Router()

router.post('/level', levelController)
router.post('/ascend', ascendController)
router.post('/rankup', rankUpController)

export default router