// Import Classes
import CollectionDatabase from '../databases/collection_database.js'

// Import Functions
import rarity from './rarity.js'
import gachaUnits from './gacha_units.js'
import gachaRateUp from './gacha_rate_up.js'

// Import Constants
import { AMULET_CONVERT, RATE_UP } from './constants/constants.js'

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
    collection_db.close()
    return false
  } else {
    user_db.setAmulets(discord_id, user.amulets + AMULET_CONVERT[unit.rarity-1])
    collection_db.close()
    return true
  }
}

/**
 * Obtains a random unit from the given gacha
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @param {Integer} current_gacha is the gacha to pull from
 * @param {UserDatabase} user_db is the database that is used to access the request
 * @param {boolean} pity is if we have obtained the free 2* + from a 10 pull
 * @return {Object} unit object of the resulting pull
 */
const pullUnit = (discord_id, server_id, current_gacha, user, user_db, pity=false) => {
  const gacha_type = parseInt((''+current_gacha.gacha_id).charAt(0))

  const pull_rarity = rarity(pity, gacha_type)
  let gacha_units = gachaUnits(pull_rarity)

  if (gacha_type === 2) {
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
    if (rate_up_ids.length > 0 && Math.random() < RATE_UP) {
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