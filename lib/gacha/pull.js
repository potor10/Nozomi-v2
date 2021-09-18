// Import Classes
import UserDatabase from '../databases/user_database.js'
import GachaDatabase from '../databases/gacha_database.js'
import ApiException from '../api_exception.js'

// Import Functions
import dailyTime from '../time/daily_time.js'

import pullUnit from './gacha_components/pull_unit.js'
import gachaData from './gacha_components/gacha_data.js'

// Import Constants
import { AMULET_CONVERT } from '../constants.js'

/**
 * Simulates a 1 pull on the specified gacha
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @param {Integer} gacha_id is the gacha that is being requested to pull on
 * @param {boolean} discount is if we are pulling with daily discount
 * @return {Object} unit object pulled by player
 */
const pull = (discord_id, server_id, gacha_id, discount=false) => {
  const user_db = new UserDatabase(server_id)
  const gacha_db = new GachaDatabase(server_id)

  const user = user_db.getUser(discord_id)
  const current_gacha = gachaData(discord_id, server_id).gachas[gacha_id]

  if (discount && current_gacha.discount_available === false) {
    return {}
  }

  // Disallow single pulls on certain gachas
  if (current_gacha.gacha_type === 1 && current_gacha.type_id !== 6) {
    gacha_db.setGachaLastPull(discord_id, gacha_id, dailyTime())

    if (discount) gacha_db.setGachaLastDiscount(discord_id, gacha_id, dailyTime())
    gacha_db.close()

    const jewel_cost = (discount) ? (current_gacha.discount_price) : (current_gacha.price)

    if (user.jewels >= jewel_cost) {
      const obtained_unit = pullUnit(discord_id, server_id, current_gacha, user, user_db)

      const amulets_obtained = (obtained_unit.dupe) ? AMULET_CONVERT[obtained_unit.rarity-1] : 0
      const new_units = (obtained_unit.dupe) ? 0 : 1

      // subtract the jewels from the user
      user_db.setJewels(user.discord_id, user.jewels - jewel_cost)
      user_db.setAmulets(discord_id, user.amulets + amulets_obtained)

      // add 1 exchange point
      if (current_gacha.exchange_id !== 9999) {
        user_db.setExchangePoints(user.discord_id, user.exchange_points + 1)
      }
      user_db.close()

      const pull_data = {
        pull_result: [obtained_unit],
        amulets_obtained: amulets_obtained,
        exchange_points_obtained: 1,
        new_units: new_units
      }
      
      return pull_data
    } else {
      throw new ApiException(400, 'You Do Not Have Enough Jewels To Perform This Operation')
    }
  }
  return {}
}

export default pull