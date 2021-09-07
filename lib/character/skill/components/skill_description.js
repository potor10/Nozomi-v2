// Import Classes
import MasterDatabase from '../../../databases/master_database.js'

/**
 * Calculates the displayed description of the skill in question
 * @param {Object} unit is the unit that we are finding the skill description for
 * @param {Object} actions is the skill actions array
 * @param {Integer} skill_level is the current level of the skill
 * @return {Array} array of strings representing skill description of actions
 */
const skillDescription = (unit, actions, skill_level) => {
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
            action.action_value_3 * unit[action_stat])
          break
        // Healing
        case 4:
          skill_power = Math.round(
            (action.action_value_2 + 
            action.action_value_3 * skill_level + 
            action.action_value_4 * unit[action_stat]) * 
            (1 + unit.hp_recovery_rate / 100))
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
          const master_db = new MasterDatabase()
          const unit_data = master_db.getUnitData(unit.unit_id)
          master_db.close()
          action_stat = "atk"
          if (unit_data.atk_type === 2) action_stat = "magic_str"
          skill_power = Math.round(
            action.action_value_1 + 
            action.action_value_2 * skill_level + 
            action.action_value_3 * unit[action_stat])
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
            action.action_value_3 * unit[action_stat])
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

export default skillDescription