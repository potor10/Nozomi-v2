// Import Constants
import { STAT_NAMES } from '../../../constants.js'

/**
 * Obtains the base stats of a unit

 */
const unitBaseStats = (component, unit) => {
  let stats = {}

  const effective_level = unit.level + unit.promotion_level

  const base_stat = component.state.rarity_data[unit.rarity - 1]

  STAT_NAMES.forEach(stat => {
    stats[stat] = Math.round(base_stat[stat] + base_stat[stat + "_growth"] * effective_level)
  })

  return stats
}

export default unitBaseStats