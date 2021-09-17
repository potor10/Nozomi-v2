// Import Constants
import { MANA_TO_XP } from '../../../../../constants.js'

/**
 * Calculates the cost of leveling up the unitnit once
 */
const getLevelUpMaxCost = (component) => {
  if (component.props.unit.level + 1 > component.props.user_stats.level) {
    return { level_up_available: false }
  }

  let mana_cost = Math.round((component.props.experience_unit_data[component.props.unit.level].total_exp - 
    component.props.experience_unit_data[component.props.unit.level-1].total_exp) / MANA_TO_XP)
  let new_level = component.props.unit.level+1

  while (new_level < component.props.user_stats.level) {
    let next_mana_cost = Math.round((component.props.experience_unit_data[new_level-1].total_exp - 
      component.props.experience_unit_data[component.props.unit.level-1].total_exp) / MANA_TO_XP)
    if (next_mana_cost > component.props.user_stats.mana) break
    new_level += 1
    mana_cost = next_mana_cost
  }

  let level_max_info = {
    level_up_available: true,
    can_buy_max: component.props.user_stats.mana >= mana_cost,
    mana_cost: mana_cost,
    new_level: new_level,
    max: true
  } 

  return level_max_info
}

export default getLevelUpMaxCost