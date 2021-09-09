// Import Modules
import express from 'express'

// Import Controllers
import charactersController from '../../controllers/characters/characters_get/characters_controller.js'

const router = express.Router()

router.get('/:server_id', charactersController)

export default router