// Import Constants
import { STAT_NAMES, EQUIP_SLOT_PREFIX } from '../../../../../../constants'

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
 * @param 
 * @return {Object} unit equip stats
 */
const singleEquipStat = (equip_id, equipment_data, equipment_enhance_data) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  STAT_NAMES.forEach(stat => {
    stats[stat] = Math.ceil(equipment_data[equip_id][stat]) +
      Math.ceil(equipment_enhance_data[equip_id][stat] * getMaxRefine(equipment_data[equip_id].promotion_level))
  })

  return stats
}

export default singleEquipStat