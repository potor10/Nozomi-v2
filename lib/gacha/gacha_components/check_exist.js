// Import Classes
import CollectionDatabase from '../../databases/collection_database.js'

// Import Functions
import calculateStats from '../../character/stats/calculate_stats.js'

// Import Constants
import { AMULET_CONVERT } from '../../constants.js'

/**
 * Checks if the unit exists in the collection, then adds a new unit or adds amulets
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @param {Integer} unit is the unit to check
 * @param {Object} user is the stats of the user in question
 * @param {UserDatabase} user_db is the database that is used to access the request
 * @return {boolean} state of if the unit exists
 */
const checkExist = (discord_id, server_id, unit, user, user_db) => {
  const collection_db = new CollectionDatabase(server_id)

  if (collection_db.getUnit(discord_id, unit.unit_id) === undefined) {
    collection_db.addUnit(discord_id, unit)
    calculateStats(discord_id, server_id, unit.unit_id)
    collection_db.close()
    return false
  } else {
    user_db.setAmulets(discord_id, user.amulets + AMULET_CONVERT[unit.rarity-1])
    collection_db.close()
    return true
  }
}

export default checkExist