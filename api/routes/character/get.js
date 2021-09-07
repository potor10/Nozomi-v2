// Import Modules
import express from 'express'

// Import Controllers

const router = express.Router()

router.get('/get/:server_id/:unit_id', () => {return false})
router.post('/logout', () => {return false})

export default router