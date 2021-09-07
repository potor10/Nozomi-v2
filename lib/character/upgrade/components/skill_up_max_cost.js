// Import Classes
import MasterDatabase from '../../../databases/master_database.js'
import ApiException from '../../../api_exception.js'

// Import Constants
import { NUMBER_TO_SKILL } from '../../../constants.js'

/**
 * Calculates the cost of leveling up the skill
 * @param {Object} unit is the unit we are leveling up
 * @param {Integer} user is the owner of the unit
 * @param {String} skill_name is the name of the skill we are upgrading
 * @return {Integer} cost of leveling up the unit once
 */
const skillUpMaxCost = (unit, user, skill_name) => {
  let master_db = new MasterDatabase()
  let skill_cost_data = master_db.getSkillCost()
  let unlock_skill_data = master_db.getUnlockSkillData() 

  let unlocked = false
  unlock_skill_data.forEach(unlock => {
    if (NUMBER_TO_SKILL[unlock.unlock_skill] === skill_name && 
      unit.promotion_level >= unlock.promotion_level) {
        unlocked = true
      }
  })

  if (unlocked === false) throw new ApiException(400, 'You Do Not Have Access To This Skill')
  if (unit[skill_name] + 1 > unit.level) throw new ApiException(400, 'Cannot Level Up Past Unit Level')

  let mana_cost = 0
  let new_level = unit[skill_name]

  while (new_level < unit.level) {
    new_level += 1
    if (mana_cost + skill_cost_data[new_level-1].cost > user.mana) break
    mana_cost += skill_cost_data[new_level-1].cost
  }

  let skill_max_info = {
    mana_cost: mana_cost,
    new_level: new_level
  } 

  return skill_max_info
}

export default skillUpMaxCost