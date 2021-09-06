// Import Classes
import MasterDatabase from '../../databases/master_database.js'

// Import Constants
import { NUMBER_TO_STAT, STAT_NAMES } from './constants/constants.js'

/**
 * Obtains the stats from a unit's ex skill
 * @param {Object} unit the object of the unit
 * @return {Object} unit ex skill stats
 */
const exStats = (unit) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  let master_db = new MasterDatabase

  if (unit.promotion_level >= 7) {
    const unit_skill_data = master_db.getUnitSkillData(unit.unit_id)
    let ex_skill = unit_skill_data.ex_skill_1

    if (unit.rarity >= 5) {
      ex_skill = unit_skill_data.ex_skill_evolution_1
    }

    const skill_action_data = master_db.getSkillAction(ex_skill)
    skill_action_data.forEach(action => {
      if (action.action_type === 90) {
        let stat = NUMBER_TO_STAT[action.action_detail_1]
        stats[stat] = action.action_value_2 + action.action_value_3 * unit.ex_level
      }
    })
    
  }

  master_db.close()
  return stats
}

export default exStats