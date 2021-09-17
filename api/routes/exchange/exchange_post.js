// Import Modules
import express from 'express'

// Import Controllers
import exchangeUnitController from '../../controllers/exchange/exchange_post/exchange_unit_controller.js'

const router = express.Router()

router.post('/unit', exchangeUnitController)

export default router