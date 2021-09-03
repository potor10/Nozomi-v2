// Dependencies
const express = require('express')
const router = express.Router()

// Require controller modules.
const collection_controller = require('../controllers/collection_controller')

router.get('/all/:server_id', collection_controller.get_all)

router.get('/get/:server_id/:unit_id', collection_controller.get)

module.exports = router