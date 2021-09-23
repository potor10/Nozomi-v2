// Import Modules
import express from 'express'

// Import Controllers
import ticketsController from '../../controllers/support/support_get/tickets_controller.js'

const router = express.Router()

router.get('/tickets', ticketsController)

export default router