// Import Modules
import express from 'express'

// Import Controllers
import characterController from '../../controllers/character/character_get/character_controller.js'

const router = express.Router()

router.get('/get/:server_id/:unit_id', characterController)

export default router