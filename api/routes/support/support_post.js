// Import Modules
import express from 'express'

// Import Controllers
import openTicketController from '../../controllers/support/support_post/open_ticket_controller.js'
import redeemCodeController from '../../controllers/support/support_post/redeem_code_controller.js'

const router = express.Router()

router.post('/ticket', openTicketController)
router.post('/code', redeemCodeController)

export default router