// Dependencies
const express = require('express')
const router = express.Router()

// Require controller modules.
const discord_controller = require('../controllers/discord_controller')

router.post('/login', discord_controller.login)

router.post('/logout', discord_controller.logout)

router.get('/user', discord_controller.user)

router.get('/guilds', discord_controller.guilds)

module.exports = router