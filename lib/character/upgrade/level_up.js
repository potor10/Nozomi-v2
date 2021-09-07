// Import Classes
import UserDatabase from '../../databases/user_database.js'
import CollectionDatabase from '../../databases/collection_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import calculateStats from '../stats/calculate_stats.js'

// Import Functions
import levelUpCost from './components/level_up_cost.js'
import levelUpMaxCost from './components/level_up_max_cost.js'

/**
 * Levels up the unit
 * @param {String} discord_id discord id of the user 
 * @param {String} server_id server id of the request
 * @param {Integer} unit_id unit to upgrade
 * @param {boolean} max use as much mana as you can to level up the character
 * @return {boolean} state of the request
 */
const levelUp = (discord_id, server_id, unit_id, max=false) => {
  const user_db = new UserDatabase(server_id)
  const collection_db = new CollectionDatabase(server_id)

  const unit = collection_db.getUnit(discord_id, unit_id)
  const user = user_db.getUser(discord_id)

  const level_info = (max) ? levelUpMaxCost(unit, user) : levelUpCost(unit, user)

  if (user.mana < level_info.mana_cost) throw new ApiException(400, 'Not Enough Mana!')
  console.log(level_info.mana_cost)
  user_db.setMana(discord_id, user.mana - level_info.mana_cost)
  collection_db.setLevel(discord_id, unit_id, level_info.new_level)

  user_db.close()
  collection_db.close()
  calculateStats(discord_id, server_id, unit_id)
  return true
}

export default levelUp
