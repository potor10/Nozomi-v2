// Import Classes
import UserDatabase from '../databases/user_database.js'
import ApiException from '../api_exception.js'

// Import Functions
import pullUnit from './pull_unit.js'
import gachaData from './gacha_data.js'

/**
 * Simulates a 10 pull on the specified gacha
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @param {Integer} gacha_id is the gacha that is being requested to pull on
 * @return {Array} array of unit objects pulled by user
 */
const pullTen = (discord_id, server_id, gacha_id) => {
  const user_db = new UserDatabase(server_id)

  let current_gacha = gachaData()[gacha_id]
  // Unit Gacha VS Normal Gacha
  if (current_gacha.gacha_detail === 2) {
    const user = user_db.getUser(discord_id)

    if (user.jewels >= current_gacha.price * 10) {
      let obtained_units = []
      let total_rarity = 0
      for (let i = 0; i < 9; i++) {
        const obtained_unit = pullUnit(discord_id, server_id, current_gacha, user, user_db)
        obtained_units.push(obtained_unit)
        total_rarity += obtained_unit.rarity
      }

      const pity = (total_rarity < 10) ? true : false
      const obtained_unit = pullUnit(discord_id, server_id, current_gacha, user, user_db, pity)
      obtained_units.push(obtained_unit)

      // subtract the jewels from the user
      user_db.setJewels(user.discord_id, user.jewels + (-1 * current_gacha.price * 10))
      user_db.close()

      return obtained_units
    } else {
      throw new ApiException(400, 'You Do Not Have Enough Jewels To Perform This Operation')
    }
  }
  return {}
}

export default pullTen