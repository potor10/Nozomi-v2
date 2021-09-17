// Import Functions
import rarity from './rarity.js'
import gachaUnits from './gacha_units.js'
import gachaRateUp from './gacha_rate_up.js'
import checkExist from './check_exist.js'

// Import Constants
import { RATE_UP, TYPE_RARITY } from '../../constants.js'

/**
 * Obtains a random unit from the given gacha
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @param {Integer} current_gacha is the gacha to pull from
 * @param {UserDatabase} user_db is the database that is used to access the request
 * @param {Integer} pity determines the level of pity we have (0: none, 1: 2*+, 3: 3*+)
 * @return {Object} unit object of the resulting pull
 */
const pullUnit = (discord_id, server_id, current_gacha, user, user_db, pity=0) => {
  const pull_rarity = rarity(pity, current_gacha.type_id)
  let gacha_units = gachaUnits(pull_rarity)

  // If gacha is premium or jump start
  if (current_gacha.type_id === 2 || current_gacha.type_id === 6) {
    // Normal Premium Gacha 
    const unit_ids = Object.keys(gacha_units)

    // Obtain a character with all characters having an equal chance to be pulled
    const random_unit_id = unit_ids[Math.floor(unit_ids.length * Math.random())]
    const obtained_unit = gacha_units[random_unit_id]
    obtained_unit.dupe = checkExist(discord_id, server_id, obtained_unit, user, user_db)

    return obtained_unit
  } else {
    // Rate Up Gacha 
    let units_rate_up = Object.keys(gachaRateUp(current_gacha.exchange_id, pull_rarity))

    const standard_ids = []
    const rate_up_ids = []

    for(const unit_id in gacha_units)  {
      if (units_rate_up.includes(unit_id)) {
        rate_up_ids.push(unit_id)
      } else {
        standard_ids.push(unit_id)
      }
    }

    let obtained_unit = {}

    let rate_up_chance = RATE_UP[pull_rarity-1] / TYPE_RARITY[current_gacha.type_id][pull_rarity-1]

    if (rate_up_ids.length > 0 && Math.random() < rate_up_chance) {
      const random_unit_id = rate_up_ids[Math.floor(rate_up_ids.length * Math.random())]
      obtained_unit = gacha_units[random_unit_id]
    } else {
      const random_unit_id = standard_ids[Math.floor(standard_ids.length * Math.random())]
      obtained_unit = gacha_units[random_unit_id]
    }

    obtained_unit.dupe = checkExist(discord_id, server_id, obtained_unit, user, user_db)
    return obtained_unit
  }
}

export default pullUnit