// Import Classes
import MasterDatabase from '../../../databases/master_database.js'
import ApiException from '../../../api_exception.js'

// Import Constants
import { MANA_TO_XP } from '../../../constants.js'

/**
 * Calculates the cost of leveling up the unit
 * @param {Object} unit is the unit we are leveling up
 * @param {Integer} user is the owner of the unit
 * @return {Integer} cost of leveling up the unit once
 */
const levelUpMaxCost = (unit, user) => {
  const master_db = new MasterDatabase()
  const experience_unit_data = master_db.getExperienceUnit()
  master_db.close()

  if (unit.level + 1 > user.level) throw new ApiException(400, 'Cannot Level Up Unit Past Player Level')

  let mana_cost = Math.round((experience_unit_data[unit.level].total_exp - 
    experience_unit_data[unit.level-1].total_exp) / MANA_TO_XP)
  let new_level = unit.level+1
  while (new_level < user.level) {
    let next_mana_cost = Math.round((experience_unit_data[new_level-1].total_exp - 
      experience_unit_data[unit.level-1].total_exp) / MANA_TO_XP)
    if (next_mana_cost > user.mana) break
    new_level += 1
    mana_cost = next_mana_cost
  }

  let level_max_info = {
    mana_cost: mana_cost,
    new_level: new_level
  } 

  return level_max_info
}

export default levelUpMaxCost