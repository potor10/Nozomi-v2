// Import Classes
import UserDatabase from '../databases/user_database.js'
import GachaDatabase from '../databases/gacha_database.js'
import ApiException from '../api_exception.js'

// Import Functions
import dailyTime from '../time/daily_time.js'
import normalResetTime from '../time/normal_reset_time.js'

import pullUnit from './gacha_components/pull_unit.js'
import pullNormal from './gacha_components/pull_normal.js'
import gachaData from './gacha_components/gacha_data.js'

/**
 * Simulates a 10 pull on the specified gacha
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @param {Integer} gacha_id is the gacha that is being requested to pull on
 * @return {Array} array of unit objects pulled by user
 */
const pullTen = (discord_id, server_id, gacha_id) => {
  const user_db = new UserDatabase(server_id)
  const gacha_db = new GachaDatabase(server_id)

  const user = user_db.getUser(discord_id)
  const current_gacha = gachaData(discord_id, server_id)[gacha_id]

  // add check if pull available

  // Unit Gacha VS Normal Gacha
  if (current_gacha.gacha_type === 1) {
    gacha_db.setGachaLastPull(discord_id, gacha_id, dailyTime())
    gacha_db.close()

    if (user.jewels >= current_gacha.price * 10) {
      let obtained_units = []

      let is_two_star = false
      let is_three_star = false

      for (let i = 0; i < 9; i++) {
        const obtained_unit = pullUnit(discord_id, server_id, current_gacha, user, user_db)
        obtained_units.push(obtained_unit)

        if (obtained_unit.rarity === 2) is_two_star = true
        if (obtained_unit.rarity === 3) is_three_star = true
      }

      let pity = (!is_two_star) ? 1 : 0 // Determine if we get guaranteed 2*
      // If we get a guaranteed 3* gacha
      if (current_gacha.type_id === 6) {
        pity = (!is_three_star) ? 2 : pity // Determine if we get guaranteed 3*
      }

      const obtained_unit = pullUnit(discord_id, server_id, current_gacha, user, user_db, pity)
      obtained_units.push(obtained_unit)

      // subtract the jewels from the user
      user_db.setJewels(user.discord_id, user.jewels - (current_gacha.price * 10))
      user_db.close()

      return obtained_units
    } else {
      throw new ApiException(400, 'You Do Not Have Enough Jewels To Perform This Operation')
    }
  } else if (current_gacha.gacha_type === 0) {
    gacha_db.setGachaLastPull(discord_id, gacha_id, normalResetTime())
    gacha_db.close()

    let normal_pull = {
      equipment: [],
      memory_shards: []
    }

    let jewels_earned = 0
    let princess_hearts_earned = 0

    for (let i = 0; i < 10; i++) { 
      const obtained_item = pullNormal(discord_id, user, user_db)
      if (obtained_item.item_type === 0) {
        normal_pull.equipment.push(obtained_item.item_obtained)
        jewels_earned += obtained_item.item_obtained.sale_price
      } else if (obtained_item.item_type === 1) {
        normal_pull.memory_shards.push(obtained_item.item_obtained)
        princess_hearts_earned += 1
      }
    }

    user_db.setJewels(discord_id, user.jewels + jewels_earned)
    user_db.setPrincessHearts(discord_id, user.princess_hearts + princess_hearts_earned)

    return normal_pull
  }
  return {}
}

export default pullTen