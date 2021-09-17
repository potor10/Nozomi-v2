// Import Constants
import { MANA_TO_XP } from '../../../../../constants.js'

/**
 * Calculates the cost of leveling up the unit

 */
const getLevelUpCost = (component) => {
  if (component.props.unit.level + 1 > component.props.user_stats.level) {
    return { level_up_available: false }
  }

  const mana_cost = Math.round((component.props.experience_unit_data[component.props.unit.level].total_exp - 
    component.props.experience_unit_data[component.props.unit.level-1].total_exp) / MANA_TO_XP)

  let level_info = {
    level_up_available: true,
    can_buy_level: component.props.user_stats.mana >= mana_cost,
    mana_cost: mana_cost,
    new_level: component.props.unit.level + 1,
    max: false
  } 

  return level_info 
}

export default getLevelUpCost