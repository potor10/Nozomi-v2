// Import Classes
import UserDatabase from '../../databases/user_database.js'
import CollectionDatabase from '../../databases/collection_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import ascendCost from './upgrade_components/ascend_cost.js'
import calculateStats from '../stats/calculate_stats.js'

/**
 * Ascends the unit to the next rarity
 * @param {String} discord_id discord id of the user 
 * @param {String} server_id server id of the request
 * @param {Integer} unit_id unit to ascend
 * @return {boolean} state of the request
 */
const ascend = (discord_id, server_id, unit_id) => {
  const user_db = new UserDatabase(server_id)
  const collection_db = new CollectionDatabase(server_id)

  const unit = collection_db.getUnit(discord_id, unit_id)
  const user = user_db.getUser(discord_id)

  const ascend_cost = ascendCost(unit)

  if (user.amulets < ascend_cost.amulet_cost) throw new ApiException(400, 'Not Enough Amulets!')
  if (user.mana < ascend_cost.mana_cost) throw new ApiException(400, 'Not Enough Mana!')
  
  user_db.setAmulets(discord_id, user.amulets - ascend_cost.amulet_cost)
  user_db.setMana(discord_id, user.mana - ascend_cost.mana_cost)
  collection_db.setRarity(discord_id, unit_id, unit.rarity+1)

  user_db.close()
  collection_db.close()
  calculateStats(discord_id, server_id, unit_id)
  return true
}

export default ascend