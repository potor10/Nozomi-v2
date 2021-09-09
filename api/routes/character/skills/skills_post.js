// Import Modules
import express from 'express'

// Import Controllers
import skillUpController from '../../../controllers/character/skills/skills_post/skill_up_controller.js'

const router = express.Router()

router.post('/level', skillUpController)

export default router