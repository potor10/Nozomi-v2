// Import Constants
import { NUMBER_TO_STAT, STAT_NAMES, ACTION_PREFIX, EX_SKILL_NAMES } from '../../../constants.js'

/**
 */
const unitExStats = (component, unit) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  if (unit.promotion_level >= 7) {
    let ex_skill = component.state.unit_skill_data[EX_SKILL_NAMES[1]]

    if (unit.rarity >= 5) {
      ex_skill = component.state.unit_skill_data[EX_SKILL_NAMES[2]]
    }

    const skills_data = component.state.skill_data
    const actions_data = component.state.skill_action_data

    let actions = []
    let action_idx = 1
    // Add all applicable actions to the actions array
    while(skills_data[ex_skill][ACTION_PREFIX+action_idx] !== undefined) {
      if (skills_data[ex_skill][ACTION_PREFIX+action_idx] !== 0) { 
        actions.push(actions_data[skills_data[ex_skill][ACTION_PREFIX+action_idx]])
      }
      action_idx += 1
    }

    // Calculate total stat gain
    actions.forEach(action => {
      if (action.action_type === 90) {
        let stat = NUMBER_TO_STAT[action.action_detail_1]
        stats[stat] = action.action_value_2 + action.action_value_3 * unit[EX_SKILL_NAMES[0]]
      }
    })
    
  }
  return stats
}

export default unitExStats