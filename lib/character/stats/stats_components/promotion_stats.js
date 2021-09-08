// Import Constants
import { STAT_NAMES } from '../../../constants.js'

/**
 * Obtains the stats from a unit's promotion level
 * @param {Object} unit the object of the unit
 * @param {MasterDatabase} master_db instance that we are using
 * @return {Object} unit promotion stats
 */
const promotionStats = (unit, master_db) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  if (unit.promotion_level > 1) {
    const unit_promotion_status = master_db.getUnitPromotionStatus(unit.unit_id)
    STAT_NAMES.forEach(stat => {
      stats[stat] = unit_promotion_status[unit.promotion_level-2][stat]
    })
  }

  return stats
}

export default promotionStats
