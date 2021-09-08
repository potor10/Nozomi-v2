// Import Modules
import express from 'express'

// Import Controllers
import character from '../../controllers/character/character_get/character.js'

const router = express.Router()

router.get('/get/:server_id/:unit_id', character)

export default router