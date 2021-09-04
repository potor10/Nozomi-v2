// Dependencies
const express = require('express')
const router = express.Router()

// Require controller modules.
const master_db_controller = require('../controllers/master_db_controller')

router.get('/exp/:level', master_db_controller.exp)

router.get('/equipment/needed/:unit_id/:promotion_level', master_db_controller.needed_equipment)

router.get('/equipment/get/:equipment_id', master_db_controller.get_equipment)

router.get('/rarity/max/:unit_id', master_db_controller.max_rarity)

module.exports = router