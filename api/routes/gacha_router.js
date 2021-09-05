// Dependencies
const express = require('express')
const router = express.Router()

// Require controller modules.
const gacha_controller = require('../controllers/gacha_controller')

router.post('/pullten', gacha_controller.pull_ten)

module.exports = router