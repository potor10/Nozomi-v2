// Import Constants
import { NUMBER_TO_SKILL } from '../../../../constants.js'

/**
 * Calculates the cost of leveling up the skill

 */
const getSkillUpCost = (component, skill_name) => {

  let unlocked = false
  component.props.unlock_skill_data.forEach(unlock => {
    if (NUMBER_TO_SKILL[unlock.unlock_skill] === skill_name && 
      component.props.unit.promotion_level >= unlock.promotion_level) {
        unlocked = true
      }
  })

  if (unlocked === false) {
    return {
      skill_unlocked: false,
      skill_up_available: false
    }
  }

  if (component.props.unit[skill_name] + 1 > component.props.unit.level) {
    return {
      skill_unlocked: true,
      skill_up_available: false
    }
  }

  let mana_cost = component.props.skill_cost_data[component.props.unit[skill_name]].cost
  let new_level = component.props.unit[skill_name] + 1 
  let can_skill_up = component.props.user.mana >= mana_cost

  let skill_info = {
    skill_unlocked: true,
    skill_up_available: true,
    can_skill_up: can_skill_up,
    mana_cost: mana_cost,
    new_level: new_level,
    max: false
  }

  return skill_info
}

export default getSkillUpCost