// Import Modules
import express from 'express'

// Import Controllers
import characters from '../../controllers/characters/characters_get/characters.js'

const router = express.Router()

router.get('/:server_id', characters)

export default router