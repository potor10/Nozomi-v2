// Import Modules
import express from 'express'

// Import Controllers
import login from '../../controllers/user/user_post/login.js'
import logout from '../../controllers/user/user_post/logout.js'
import daily from '../../controllers/user/user_post/daily.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/daily', daily)

export default router