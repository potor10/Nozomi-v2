
// Import Classes
import MasterDatabase from '../../../databases/master_database.js'
import ApiException from '../../../api_exception.js'

// Import Constants
import { EQUIP_SLOT_PREFIX } from '../constants/constants.js'

/**
 * Calculates the cost of equipping an item
 * @param {Object} unit is the unit we are equipping items onto
 * @param {Integer} equip_idx is the equip slot that we are equipping
 * @return {Integer} cost of equipping the equipment
 */
const equipCost = (unit, equip_idx) => {
  const master_db = new MasterDatabase()
  const unit_promotion = master_db.getUnitPromotion(unit.unit_id)
  const equip_id = unit_promotion[unit.promotion_level-1][EQUIP_SLOT_PREFIX+equip_idx]
  if (equip_id === 999999 || equip_id === undefined) throw new ApiException(400, 'ERROR: Cannot Equip This Equipment')
  const equipment_cost = master_db.getEquipmentEnhance(equip_id).total_point
  return equipment_cost
}

export default equipCost