// Import Classes
import UserDatabase from '../databases/user_database.js'
import CollectionDatabase from '../../databases/collection_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import skillUpCost from './components/skill_up_cost.js'
import skillUpMaxCost from './components/skill_up_max_cost.js'

/**
 * Levels up the skill of the unit
 * @param {String} discord_id discord id of the user 
 * @param {String} server_id server id of the request
 * @param {Integer} unit_id unit to upgrade
 * @param {String} skill_name is the name of the skill we are upgrading
 * @param {boolean} max use as much mana as you can to level up the character
 * @return {boolean} state of the request
 */
const skillUp = (discord_id, server_id, unit_id, skill_name, max=false) => {
  const user_db = new UserDatabase(server_id)
  const collection_db = new CollectionDatabase(server_id)

  const user = user_db.getUser(discord_id)
  const unit = collection_db.getUnit(discord_id, unit_id)

  const skill_info = (max) ? skillUpCost(unit, skill_name) : skillUpMaxCost(unit, user, skill_name)

  if (user.mana < skill_info.mana_cost) throw new ApiException(400, 'Not Enough Mana!')

  user_db.setMana(discord_id, user.mana - skill_info.mana_cost)
  const skills = { skill_name: skill_info.new_level }
  collection_db.setSkills(discord_id, unit_id, skills)

  user_db.close()
  collection_db.close()
  return true
}

export default skillUp