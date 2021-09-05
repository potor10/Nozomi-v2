// Dependencies
const express = require('express')
const router = express.Router()

// Require controller modules.
const account_controller = require('../controllers/account_controller')

router.get('/me/:server_id', account_controller.get_me)

router.get('/user/:server_id/:discord_id', account_controller.get_user)

router.get('/all/:server_id', account_controller.get_all)

router.post('/daily', account_controller.daily)

module.exports = router