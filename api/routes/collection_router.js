// Dependencies
const express = require('express')
const router = express.Router()

// Require controller modules.
const collection_controller = require('../controllers/collection_controller')

router.get('/characters/all/:server_id/:sort_id', collection_controller.get_all_units)

router.get('/characters/get/:server_id/:unit_id', collection_controller.get_unit)

router.get('/characters/level/cost/:server_id/:unit_id', collection_controller.get_unit_level_cost)

router.get('/characters/level/max_cost/:server_id/:unit_id', collection_controller.get_unit_level_cost_max)

router.get('/equipment/cost/:server_id/:unit_id/:equip_idx', collection_controller.equipment_cost)

router.get('/skills/all/:server_id/:unit_id', collection_controller.get_all_skills)

router.get('/skills/get/:server_id/:unit_id/:skill_name', collection_controller.get_skill)

router.post('/characters/level/level_up', collection_controller.level_up_unit)

router.post('/equipment/equip', collection_controller.equip_equipment)

router.post('/equipment/rank_up', collection_controller.rank_up)

module.exports = router