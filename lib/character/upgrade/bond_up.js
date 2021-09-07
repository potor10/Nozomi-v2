// Import Classes
import UserDatabase from '../../databases/user_database.js'
import CollectionDatabase from '../../databases/collection_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import bondCost from './components/bond_cost.js'
import calculateStats from '../stats/calculate_stats.js'

/**
 * Levels up the unit bond to the next level
 * @param {String} discord_id discord id of the user 
 * @param {String} server_id server id of the request
 * @param {Integer} unit_id id of the unit to upgrade
 * @return {boolean} state of the request
 */
const bondUp = (discord_id, server_id, unit_id) => {
  const user_db = new UserDatabase(server_id)
  const collection_db = new CollectionDatabase(server_id)

  const unit = collection_db.getUnit(discord_id, unit_id)
  const user = user_db.getUser(discord_id)

  const love_needed = bondCost(unit)

  if (user.jewels < love_needed) throw new ApiException(400, 'Not Enough Jewels')
  
  user_db.setJewels(discord_id, user.jewels - love_needed)
  collection_db.setBond(discord_id, unit_id, unit.bond+1)

  user_db.close()
  collection_db.close()
  calculateStats(discord_id, server_id, unit_id)
  return true
}

export default bondUp