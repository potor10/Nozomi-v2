// Import Constants
import { STAT_NAMES } from '../../../constants.js'

/**
 */
const unitPromotionStats = (component, unit) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  if (unit.promotion_level > 1) {
    STAT_NAMES.forEach(stat => {
      stats[stat] = component.state.promotion_stats_data[unit.promotion_level-2][stat]
    })
  }

  return stats
}

export default unitPromotionStats
