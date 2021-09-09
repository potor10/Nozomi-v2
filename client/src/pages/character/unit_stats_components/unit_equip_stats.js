// Import Constants
import { STAT_NAMES, EQUIP_SLOT_PREFIX } from '../../../constants.js'

/**
 * Obtains the max refine level of the equipment
 * @param {Integer} promotion_level the promotion level of the equipment
 * @return {Integer} the max refine
 */
const getMaxRefine = (promotion_level) => {
	if (promotion_level >= 4) return 5
	else if (promotion_level === 3) return 3
	else if (promotion_level === 2) return 1
	else return 0
}

/**
 * Obtains the bond stats of a unit
 * @param {Object} unit the object of the unit
 * @param {MasterDatabase} master_db instance that we are using
 * @return {Object} unit equip stats
 */
const unitEquipStats = (component, unit) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  for (let i = 1; i <= 6; i++) {
    let equipped = unit[EQUIP_SLOT_PREFIX+i]

    const unit_promotion_data = component.state.promotion_data
    let equipment_id = unit_promotion_data[unit.promotion_level-1][EQUIP_SLOT_PREFIX+i]

    if (equipped === 1 && equipment_id !== 999999) {
      const equipment_data = component.state.equipment_data[equipment_id]
      
      // Equipping an item is an automatic max refine in this bot
      const equipment_enhance_data = component.state.equipment_enhance_data[equipment_id]

      STAT_NAMES.forEach(stat => {
        stats[stat] += Math.ceil(equipment_data[stat]) +
          Math.ceil(equipment_enhance_data[stat] * getMaxRefine(equipment_data.promotion_level))
      })
    }
  }
  return stats
}

export default unitEquipStats