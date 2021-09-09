// Import Modules
import express from 'express'

// Import Controllers
import equipController from '../../../controllers/character/equipment/equipment_post/equip_controller.js'

const router = express.Router()

router.post('/equip', equipController)

export default router