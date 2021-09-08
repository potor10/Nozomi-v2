// Import Constants
import { NUMBER_TO_STAT, STAT_NAMES, ACTION_PREFIX, EX_SKILL_NAMES } from '../../../constants.js'

/**
 * Obtains the stats from a unit's ex skill
 * @param {Object} unit the object of the unit
 * @return {Object} unit ex skill stats
 */
const exStats = (unit, master_db) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  if (unit.promotion_level >= 7) {
    const unit_skill_data = master_db.getUnitSkillData(unit.unit_id)
    let ex_skill = unit_skill_data[EX_SKILL_NAMES[1]]

    if (unit.rarity >= 5) {
      ex_skill = unit_skill_data[EX_SKILL_NAMES[2]]
    }

    // Get skill data of the unit and index it
    const skill_data = master_db.getSkillData(unit.base_id)
    let skills_data = {}
    skill_data.forEach(skill => {
      skills_data[skill.skill_id] = skill
    })

    // Get skill action data of the unit and index it
    const skill_action_data = master_db.getSkillAction(unit.base_id)
    let actions_data = {}
    skill_action_data.forEach(action => {
      actions_data[action.action_id] = action
    })
  
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

export default exStats