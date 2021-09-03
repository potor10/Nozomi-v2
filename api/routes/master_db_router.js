// Dependencies
const express = require('express')
const router = express.Router()

// Require controller modules.
const master_db_controller = require('../controllers/master_db_controller')

router.get('/exp/:level', master_db_controller.exp)

module.exports = router