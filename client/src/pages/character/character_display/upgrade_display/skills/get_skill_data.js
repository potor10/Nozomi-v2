
// Import Constants
import { SKILL_NAMES, EX_SKILL_NAMES, ACTION_PREFIX } from '../../../../../constants.js'

/**
 * Calculates the displayed description of the skill in question

 */
const skillDescription = (component, actions, skill_level) => {
  let description = []
  actions.forEach(action => {
    if (action.description.trim() !== '') {
      let skill_power = 0

      let action_stat = 'atk'
      if (action.action_detail_1 === 2) action_stat = "magic_str";

      switch (action.action_type) {
        // Standard Damage
        case 1:
        // Misato HP Regen
        case 48:
          skill_power = Math.round(
            action.action_value_1 + 
            action.action_value_2 * skill_level + 
            action.action_value_3 * component.props.unit[action_stat])
          break
        // Healing
        case 4:
          skill_power = Math.round(
            (action.action_value_2 + 
            action.action_value_3 * skill_level + 
            action.action_value_4 * component.props.unit[action_stat]) * 
            (1 + component.props.unit.hp_recovery_rate / 100))
          break
        // Barrier
        case 6:
        // Poison
        case 9:
        // TP
        case 16:
        // Kaori Boost
        case 34:
        // Mitsuki Debuff
        case 38:
          skill_power = Math.round(
            action.action_value_1 + 
            action.action_value_2 * skill_level)
          break
        // Buff
        case 10:
          skill_power = Math.ceil(
            action.action_value_2 + 
            action.action_value_3 * skill_level)
          break
        // Hp Activation Threshold
        case 17:
          skill_power = action.action_value_3
          break
        // Akino Regen Magic Circle
        case 37:
          action_stat = "atk"
          if (component.props.unit_data.atk_type === 2) action_stat = "magic_str"
          skill_power = Math.round(
            action.action_value_1 + 
            action.action_value_2 * skill_level + 
            action.action_value_3 * component.props.unit[action_stat])
          break
        // Ziz? Percent Hp Damage
        case 46:
          skill_power = action.action_value_1
          break
        // Ziz? /Alma? random area damage
        case 47:
          action_stat = "atk"
          if (action.action_detail_1 === 2) action_stat = "magic_str"
          skill_power = Math.round(
            action.action_value_1 + 
            action.action_value_2 * skill_level + 
            action.action_value_3 * component.props.unit[action_stat])
          break
        // Ex boost
        case 90:
          skill_power = Math.round(
            action.action_value_2 + 
            action.action_value_3 * skill_level)
          break
      }

      description.push(action.description.replace(/\{0\}/g, skill_power))
    }
  })

  return description
}

/**
 * Obtains the skill data and action info (description of the skill)
 */
const getSkillData = (component) => {
  let unit_skills = {}
  SKILL_NAMES.forEach(skill_name => {
    let skill = skill_name

    let skill_level = component.props.unit[skill_name]

    // Replace the skill name with the corresponding ex_skill (if possible)
    if (skill_name === EX_SKILL_NAMES[0]) 
      skill_name = (component.props.unit.rarity < 5) ? EX_SKILL_NAMES[1] : EX_SKILL_NAMES[2]

    const skill_id = component.props.unit_skill_data[skill_name]

    let actions = []
    let action_idx = 1
    while(component.props.skill_data[skill_id][ACTION_PREFIX+action_idx] !== undefined) {
      if (component.props.skill_data[skill_id][ACTION_PREFIX+action_idx] !== 0) { 
        actions.push(component.props.skill_action_data[
          component.props.skill_data[skill_id][ACTION_PREFIX+action_idx]])
      }
      action_idx += 1
    }

    unit_skills[skill] = {
      skill_data: component.props.skill_data[skill_id],
      actions: skillDescription(component, actions, skill_level)
    }
  })

  return unit_skills
}

export default getSkillData