// Import Classes
import UserDatabase from '../databases/user_database.js'
import ApiException from '../api_exception.js'

// Import Functions
import pullUnit from './pull_unit.js'
import gachaData from './gacha_data.js'

/**
 * Simulates a 1 pull on the specified gacha
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @param {Integer} gacha_id is the gacha that is being requested to pull on
 * @param {boolean} discount is if we are pulling with daily discount
 * @return {Array} array of unit objects pulled by user
 */
const pull = (discord_id, server_id, gacha_id, discount=false) => {
  const user_db = new UserDatabase(server_id)

  let current_gacha = gachaData()[gacha_id]
  if (current_gacha.gacha_detail === 2) {
    const jewel_cost = (discount) ? (current_gacha.discount_price) : (current_gacha.price)
    const user = user_db.getUser(discord_id)

    if (user.jewels >= jewel_cost) {
      const obtained_unit = pullUnit(discord_id, server_id, current_gacha, user, user_db)

      // subtract the jewels from the user
      user_db.setJewels(user.discord_id, user.jewels + (-1 * jewel_cost))
      user_db.close()
      
      return obtained_unit
    } else {
      throw new ApiException(400, 'You Do Not Have Enough Jewels To Perform This Operation')
    }
  }
  return {}
}

export default pull