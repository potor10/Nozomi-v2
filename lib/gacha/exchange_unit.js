// Import Classes
import UserDatabase from '../databases/user_database.js'
import ApiException from '../api_exception.js'

// Import Functions
import gachaData from './gacha_components/gacha_data.js'
import checkExist from './gacha_components/check_exist.js'

// Import Constants
import { AMULET_CONVERT } from '../constants.js'

/**
 * Exchanges exchange points for a specific unit
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @param {Integer} unit_id is the gacha unit that is being exchanged for
 * @return {Object} status of unit which is obtained
 */
const exchangeUnit = (discord_id, server_id, unit_id) => {
  const user_db = new UserDatabase(server_id)

  const user = user_db.getUser(discord_id)
  const current_exchange = gachaData(discord_id, server_id).exchanges

  if (user.exchange_points < 300) {
    throw new ApiException(400, 'You Do Not Have Enough Exchange Points')
  }

  if (current_exchange[unit_id] === undefined) {
    throw new ApiException(400, 'Unit Is Not In The Exchange Pool')
  }

  let obtained_unit = current_exchange[unit_id]
  obtained_unit.dupe = checkExist(discord_id, server_id, current_exchange[unit_id], user, user_db)

  user_db.setExchangePoints(discord_id, user.exchange_points - 300)

  const exchange_data = {
    exchange_unit: obtained_unit,
    amulets_obtained: (obtained_unit.dupe) ? AMULET_CONVERT[obtained_unit.rarity-1] : 0
  }

  return exchange_data
}

export default exchangeUnit