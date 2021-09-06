// Import Classes
import MasterDatabase from '../../databases/master_database.js'

// Import Constants
import { STAT_NAMES, NUMBER_TO_EQUIP } from './constants/constants.js'

/**
 * Obtains the max refine level of the equipment
 * @param {Integer} promotion_level the promotion level of the equipment
 * @return {Integer} the max refine
 */
const getMaxRefine = (promotion_level) => {
	if (promotion_level >= 4) return 5
	else if (refineData.promotion_level === 3) return 3
	else if (refineData.promotion_level === 2) return 1
	else return 0
}

/**
 * Obtains the bond stats of a unit
 * @param {Object} unit the object of the unit
 * @return {Object} unit equip stats
 */
equipStats = (unit) => {
  let stats = {}
  let master_db = new MasterDatabase()

  for (let i = 1; i <= 6; i++) {
    let equipped = unit[NUMBER_TO_EQUIP[i]]

    const unit_promotion_data = master_db.getUnitPromotion(unit.unit_id)
    let equipment_data = master_db.getEquipmentData()
    let equipment = {}

    equipment_data.forEach(equip => {
      equipment[equip.equipment_id] = equip
    })

    // Equipping an item is an automatic max refine in this bot
    let equipment_enhance_data = master_db.getEquipmentEnhance()
    equipment_enhance = {}

    equipment_enhance_data.forEach(equip_enhance => {
      equipment_enhance[equip_enhance.equipment_id] = equip_enhance
    })

    let equipment_id = unit_promotion_data[unit.promotion_level-1]["equip_slot_" + i]

    if (equipped === 1 && equipment_id !== 999999) {
      
      STAT_NAMES.forEach(stat => {
        stats[stat] += Math.ceil(equipment[equipment_id][stat]) +
          Math.ceil(equipment_enhance_data[equipment_id][stat] * getMaxRefine(equipment[equipment_id].promotion_level))
      })
    }
  }
  return stats
}

export default equipStats