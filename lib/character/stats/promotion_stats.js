// Import Classes
import MasterDatabase from '../../databases/master_database.js'

// Import Constants
import { STAT_NAMES } from './constants/constants.js'

/**
 * Obtains the stats from a unit's promotion level
 * @param {Object} unit the object of the unit
 * @return {Object} unit promotion stats
 */
const promotionStats = (unit) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})
  
  if (unit.promotion_level > 1) {
    const master_db = new MasterDatabase()
    const unit_promotion_status = master_db.getUnitPromotionStatus(unit.unit_id)
    STAT_NAMES.forEach(stat => {
      stats[stat] = unit_promotion_status[unit.promotion_level-2][stat]
    })
  }

  return stats
}

export default promotionStats
